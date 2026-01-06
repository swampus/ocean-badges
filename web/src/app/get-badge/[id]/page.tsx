"use client";

export const dynamic = "force-dynamic";

import { Navbar } from "@/components/Navbar";
import { BadgeEmbed } from "@/components/BadgeEmbed";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

/**
 * Client-side SVG → PNG conversion (for Instagram).
 */
async function downloadBadgeAsPng(id: string) {
  const svgUrl = `/api/badge/${id}`;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = svgUrl;

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });

  const scale = 2; // high quality / Instagram
  const canvas = document.createElement("canvas");
  canvas.width = img.width * scale;
  canvas.height = img.height * scale;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // white background (important for PNG upload)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.scale(scale, scale);
  ctx.drawImage(img, 0, 0);

  canvas.toBlob((blob) => {
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bigfive-badge-${id}.png`;
    a.click();

    URL.revokeObjectURL(url);
  }, "image/png");
}

export default function GetBadgePage({
  params
}: {
  params: { id: string };
}) {
  const { id } = params;

  const badgeUrl = `${BASE_URL}/api/badge/${id}`;
  const profileUrl = `${BASE_URL}/result/${id}`;

  const htmlCode = `<a href="${profileUrl}">
  <img src="${badgeUrl}" alt="Big Five personality badge" />
</a>`;

  const markdownCode =
    `[![Big Five personality badge](${badgeUrl})](${profileUrl})`;

  return (
    <main className="min-h-screen bg-neutral-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* HEADER */}
        <header className="text-center mb-16">
          <h1 className="text-3xl font-semibold tracking-tight">
            Get your Big Five badge
          </h1>
          <p className="mt-3 text-neutral-500">
            A simple visual summary of your personality profile
          </p>
        </header>

        {/* PREVIEW */}
        <section className="flex justify-center mb-20">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
            <img
              src={`/api/badge/${id}`}
              alt="Big Five badge preview"
              width={420}
              height={300}
            />
            <p className="mt-4 text-sm text-neutral-400 text-center">
              This is how your badge will look
            </p>
          </div>
        </section>

        {/* DOWNLOAD */}
        <section className="text-center mb-20 space-y-4">
          <h2 className="text-xl font-semibold">
            Download your badge
          </h2>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href={`/api/badge/${id}`}
              download={`bigfive-badge-${id}.svg`}
              className="px-5 py-3 rounded-lg bg-black text-white text-sm hover:bg-neutral-800"
            >
              Download SVG
            </a>

            <button
              onClick={() => downloadBadgeAsPng(id)}
              className="px-5 py-3 rounded-lg border border-neutral-300 text-sm hover:bg-neutral-100"
            >
              Download PNG (for Instagram)
            </button>
          </div>

          <p className="text-sm text-neutral-500 mt-4 max-w-xl mx-auto">
            Instagram does not support SVG files.
            Use the PNG download for posts or stories.
            The image is generated locally in your browser.
          </p>
        </section>

        {/* HOW TO USE */}
        <section className="max-w-3xl mx-auto mb-20">
          <h2 className="text-xl font-semibold text-center mb-10">
            How to use your badge
          </h2>

          <div className="space-y-8 text-neutral-700">

            <div className="flex gap-4">
              <span className="text-xl">📸</span>
              <div>
                <h3 className="font-medium">Instagram / Facebook</h3>
                <p className="text-sm">
                  Use the PNG download button above and upload the image
                  as a regular post or story. SVG files are not supported
                  by social networks.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-xl">🌐</span>
              <div>
                <h3 className="font-medium">Websites & profiles</h3>
                <p className="text-sm">
                  Use the embed code below on your website, GitHub profile,
                  blog, or forum signature. Clicking the badge opens your public
                  Big Five profile.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-xl">🔗</span>
              <div>
                <h3 className="font-medium">What the badge links to</h3>
                <p className="text-sm">
                  The badge always links to your public Big Five profile.
                  No login, no personal data, no tracking.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* EMBED */}
        <section className="mb-24">
          <h2 className="text-xl font-semibold text-center mb-6">
            Embed code
          </h2>

          <BadgeEmbed
            htmlCode={htmlCode}
            markdownCode={markdownCode}
          />
        </section>

        {/* DISCLAIMER */}
        <footer className="text-sm text-neutral-500 text-center">
          The badge is voluntary, non-clinical, and intended as a social signal —
          not for evaluation, selection, or judgment.
        </footer>

      </div>
    </main>
  );
}
