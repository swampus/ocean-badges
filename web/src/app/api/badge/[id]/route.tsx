import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const runtime = "nodejs";

const TRAITS: Record<string, { word: string; icon: string }> = {
  O: { word: "OPENNESS", icon: "🐆" },
  C: { word: "CONSCIENTIOUSNESS", icon: "🐘" },
  E: { word: "EXTRAVERSION", icon: "🦁" },
  A: { word: "AGREEABLENESS", icon: "🐃" },
  N: { word: "NEUROTICISM", icon: "🦏" },
};

function stylize(word: string) {
  return `
    <tspan font-size="14" font-weight="500">${word[0]}</tspan>
    <tspan font-size="11" letter-spacing="1.6" opacity="0.75">
      ${word.slice(1)}
    </tspan>
  `;
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const raw = await redis.get(`result:${params.id}`);
  if (!raw) return new NextResponse("Not found", { status: 404 });

    const data =
      typeof raw === "string"
        ? JSON.parse(raw)
        : raw;


     const O = Math.round(data.traits.O.percent);
     const C = Math.round(data.traits.C.percent);
     const E = Math.round(data.traits.E.percent);
     const A = Math.round(data.traits.A.percent);
     const N = Math.round(data.traits.N.percent);


     const main = [
       { k: "O", v: O },
       { k: "C", v: C },
       { k: "E", v: E },
     ].sort((a, b) => b.v - a.v);

  const [top, left, right] = main;

  const svg = `
<svg
  width="340"
  height="360"
  viewBox="60 40 340 360"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
>
  <defs>
    <radialGradient id="bg" cx="50%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#0e1324"/>
      <stop offset="100%" stop-color="#05070c"/>
    </radialGradient>

    <filter id="softGlow">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <style>
    text {
      font-family: -apple-system, BlinkMacSystemFont, Inter, Arial, sans-serif;
      fill: #e5e7eb;
    }
    .animal { font-size: 26px }
    .trait  { font-size: 12px; fill: #cbd5e1 }
    .percent { font-size: 12px; fill: #e5e7eb }
    .core {
      font-size: 14px;
      letter-spacing: 6px;
      fill: #94a3b8;
    }
  </style>

  <!-- background -->
  <rect x="60" y="40" width="380" height="360" rx="14" fill="url(#bg)"/>

  <!-- triangle -->
  <polygon
    points="230,95 95,335 365,335"
    fill="none"
    stroke="#6c7cff"
    stroke-width="1.3"
    stroke-dasharray="5 7"
  />

  <!-- OCEAN -->
  <text x="230" y="235" text-anchor="middle" class="core" opacity="0.85" filter="url(#softGlow)">
    OCEAN
  </text>

  <!-- TOP -->
  <text x="230" y="70" text-anchor="middle" class="animal">
    ${TRAITS[top.k].icon}
  </text>
  <text x="230" y="95" text-anchor="middle" class="trait">
    ${stylize(TRAITS[top.k].word)}
  </text>
  <text x="230" y="115" text-anchor="middle" class="percent">
    ${top.v}%
  </text>

  <!-- LEFT -->
  <text x="95" y="305" text-anchor="middle" class="animal">
    ${TRAITS[left.k].icon}
  </text>
  <text x="130" y="305" text-anchor="start" class="percent">
    ${left.v}%
  </text>
  <text x="120" y="330" text-anchor="middle" class="trait">
    ${stylize(TRAITS[left.k].word)}
  </text>

  <!-- RIGHT -->
  <text x="365" y="305" text-anchor="middle" class="animal">
    ${TRAITS[right.k].icon}
  </text>
  <text x="330" y="305" text-anchor="end" class="percent">
    ${right.v}%
  </text>
  <text x="340" y="330" text-anchor="middle" class="trait">
    ${stylize(TRAITS[right.k].word)}
  </text>

  <!-- secondary -->
  <text x="230" y="370" text-anchor="middle" class="percent">
    ${TRAITS.A.icon} A ${A}% · ${TRAITS.N.icon} N ${N}%
  </text>
</svg>
`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
