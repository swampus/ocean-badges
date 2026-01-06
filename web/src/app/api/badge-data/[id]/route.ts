import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const raw = await redis.get(`result:${params.id}`);
  if (!raw || typeof raw !== "string") {
    return new NextResponse("Not found", { status: 404 });
  }

  const data = JSON.parse(raw) as {
    traits: {
      O: { percent: number };
      C: { percent: number };
      E: { percent: number };
      A: { percent: number };
      N: { percent: number };
    };
  };

  const main = [
    { k: "O", v: O },
    { k: "C", v: C },
    { k: "E", v: E },
  ].sort((a, b) => b.v - a.v);

  const [top, left, right] = main;

  const svg = `
<svg width="600" height="520" viewBox="0 0 600 520"
     xmlns="http://www.w3.org/2000/svg">
  <style>
    text { font-family: Arial, sans-serif; fill: #111 }
    .title { font-size: 20px; font-weight: 600 }
    .label { font-size: 16px }
    .small { font-size: 14px; fill: #555 }
  </style>

  <rect width="600" height="520" rx="24" fill="#ffffff"/>

  <text x="300" y="40" text-anchor="middle" class="title">
    Big Five Badge
  </text>

  <polygon
    points="300,110 130,390 470,390"
    fill="none"
    stroke="#ccc"
    stroke-width="2"
  />

  <circle cx="300" cy="110" r="14" fill="#6366f1"/>
  <text x="300" y="80" text-anchor="middle" class="label">
    ${top.k} — ${top.v}%
  </text>

  <circle cx="130" cy="390" r="14" fill="#10b981"/>
  <text x="90" y="420" text-anchor="end" class="label">
    ${left.k} — ${left.v}%
  </text>

  <circle cx="470" cy="390" r="14" fill="#f59e0b"/>
  <text x="510" y="420" text-anchor="start" class="label">
    ${right.k} — ${right.v}%
  </text>

  <text x="300" y="460" text-anchor="middle" class="small">
    A: ${A}% • N: ${N}%
  </text>

  <text x="300" y="495" text-anchor="middle" class="small">
    ocean-badges.app
  </text>
</svg>
`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
