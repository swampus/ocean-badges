// src/lib/badgeSvg.ts
type TraitKey = "openness" | "conscientiousness" | "extraversion" | "agreeableness" | "neuroticism";

export type BadgeTrait = {
  key: TraitKey;
  label: string;
  value: number; // 0..100
  animalEmoji: string;
};

const TRAIT_META: Record<TraitKey, { label: string; animalEmoji: string }> = {
  openness: { label: "Openness", animalEmoji: "🐘" }, // Elephant
  conscientiousness: { label: "Conscientiousness", animalEmoji: "🦏" }, // Rhino
  extraversion: { label: "Extraversion", animalEmoji: "🦁" }, // Lion
  agreeableness: { label: "Agreeableness", animalEmoji: "🦬" }, // Buffalo
  neuroticism: { label: "Neuroticism", animalEmoji: "🐆" } // Leopard
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function scaleFromPercent(p: number) {
  // emoji size in px: 26..46 roughly
  const v = clamp(p, 0, 100);
  return 26 + (46 - 26) * (v / 100);
}

export function buildBadgeSvg(params: {
  profileUrl: string;
  title?: string;
  subtitle?: string;
  traits: Record<TraitKey, number>;
  width?: number;
  height?: number;
}) {
  const width = params.width ?? 640;
  const height = params.height ?? 220;

  const title = params.title ?? "Big Five Profile";
  const subtitle = params.subtitle ?? "Click to view the full profile";

  // Build trait list
  const list: BadgeTrait[] = (Object.keys(TRAIT_META) as TraitKey[]).map((k) => ({
    key: k,
    label: TRAIT_META[k].label,
    value: Number(params.traits[k] ?? 0),
    animalEmoji: TRAIT_META[k].animalEmoji
  }));

  // Sort descending by value
  const sorted = [...list].sort((a, b) => b.value - a.value);

  // Arrange positions: center is strongest, then near center, then edges
  // 5 items positions (x): [center, left1, right1, left2, right2]
  const cx = width / 2;
  const yEmoji = 120;

  const xs = [
    cx,
    cx - 110,
    cx + 110,
    cx - 220,
    cx + 220
  ];

  // sizes (strongest bigger), but we also keep the “rank” effect slightly:
  const sizes = sorted.map((t, idx) => {
    const base = scaleFromPercent(t.value);
    const rankBoost = (4 - idx) * 1.2; // tiny extra for rank
    return base + rankBoost;
  });

  // Background / card
  const cardX = 12;
  const cardY = 12;
  const cardW = width - 24;
  const cardH = height - 24;
  const r = 20;

  const safeProfileUrl = escapeXml(params.profileUrl);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#fbfbfb"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000000" flood-opacity="0.10"/>
    </filter>
  </defs>

  <a href="${safeProfileUrl}">
    <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="${r}" fill="url(#bg)" filter="url(#shadow)"/>

    <!-- Header -->
    <text x="${cx}" y="54" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="22" font-weight="700" fill="#111111">
      ${escapeXml(title)}
    </text>
    <text x="${cx}" y="78" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="12" font-weight="500" fill="#666666">
      ${escapeXml(subtitle)}
    </text>

    <!-- Animals row -->
    ${sorted
      .map((t, i) => {
        const x = xs[i] ?? (cx + (i - 2) * 110);
        const size = sizes[i];
        const pillW = 96;
        const pillH = 22;
        const pillX = x - pillW / 2;
        const pillY = yEmoji + 44;

        return `
    <g>
      <text x="${x}" y="${yEmoji}" text-anchor="middle"
        font-family="Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, ui-sans-serif, system-ui"
        font-size="${size}" dominant-baseline="middle">
        ${t.animalEmoji}
      </text>

      <rect x="${pillX}" y="${pillY}" width="${pillW}" height="${pillH}" rx="999" fill="#f2f2f2" stroke="#e5e5e5"/>
      <text x="${x}" y="${pillY + 15}" text-anchor="middle"
        font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial"
        font-size="11" font-weight="600" fill="#111111">
        ${escapeXml(t.key.toUpperCase().slice(0, 1))}: ${t.value.toFixed(0)}%
      </text>
    </g>`;
      })
      .join("")}

    <!-- Footer micro text -->
    <text x="${cardX + 18}" y="${height - 26}"
      font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial"
      font-size="11" fill="#8a8a8a">
      Non-clinical • Voluntary • No personal data
    </text>

    <text x="${width - 18}" y="${height - 26}" text-anchor="end"
      font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial"
      font-size="11" fill="#111111">
      view profile →
    </text>
  </a>
</svg>`;

  return svg;
}
