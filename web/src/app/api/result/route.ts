// app/api/result/route.ts
import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { calculateBigFiveProfile } from "@/lib/bigfive";
import { BIGFIVE_ITEMS_META } from "@/lib/bigfive/items";
import { Ratelimit } from "@upstash/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Limit test creation to protect Redis.
 * 5 test submissions per hour per IP.
 */
const testCreateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
});

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  try {
    /* -----------------------------
     * 1) RATE LIMIT (FIRST)
     * ----------------------------- */
    const ip = getClientIp(req);
    const { success } = await testCreateLimit.limit(`create-test:${ip}`);

    if (!success) {
      return NextResponse.json(
        { error: "Too many tests. Please try again later." },
        { status: 429 }
      );
    }

    /* -----------------------------
     * 2) PARSE & VALIDATE PAYLOAD
     * ----------------------------- */
    const { answers } = await req.json();

    if (!Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Invalid answers" },
        { status: 400 }
      );
    }

    // Minimal sanity checks to prevent spam/malformed payloads
    if (answers.length < 10 || answers.length > 400) {
      return NextResponse.json(
        { error: "Invalid number of answers" },
        { status: 400 }
      );
    }

    for (const a of answers) {
      if (
        !a ||
        typeof a.id !== "string" ||
        typeof a.score !== "number" ||
        !Number.isFinite(a.score)
      ) {
        return NextResponse.json(
          { error: "Invalid answer format" },
          { status: 400 }
        );
      }
    }

    /* -----------------------------
     * 3) CALCULATE PROFILE
     * ----------------------------- */
    const bigFiveAnswers = answers.map((a: any) => ({
      itemId: a.id,
      value: a.score,
    }));

    const profile = calculateBigFiveProfile(
      bigFiveAnswers,
      BIGFIVE_ITEMS_META
    );

    /* -----------------------------
     * 4) STORE RESULT WITH TTL
     * ----------------------------- */
    const id = crypto.randomUUID();

    await redis.set(
      `result:${id}`,
      profile, // let Redis SDK handle JSON
      {
        ex: 60 * 60 * 24 * 30, // 30 days TTL
      }
    );

    return NextResponse.json({ id });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
