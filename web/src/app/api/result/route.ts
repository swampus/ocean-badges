import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { calculateBigFiveProfile } from "@/lib/bigfive";
import { BIGFIVE_ITEMS_META } from "@/lib/bigfive/items";

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();

    if (!Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Invalid answers" },
        { status: 400 }
      );
    }

    const bigFiveAnswers = answers.map((a: any) => ({
      itemId: a.id,
      value: a.score
    }));

    const profile = calculateBigFiveProfile(
      bigFiveAnswers,
      BIGFIVE_ITEMS_META
    );

    const id = crypto.randomUUID();

    await redis.set(
      `result:${id}`,
      JSON.stringify(profile),
      { ex: 60 * 60 * 24 * 30 } // 30 days TTL (Upstash format)
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
