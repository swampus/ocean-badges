"use client";

import { useState } from "react";

export function BadgeEmbed({
  htmlCode,
  markdownCode
}: {
  htmlCode: string;
  markdownCode: string;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* HTML */}
      <div>
        <p className="text-xs text-neutral-500 mb-2">HTML</p>
        <div className="relative">
          <pre className="bg-neutral-900 text-neutral-100 text-xs p-4 rounded-lg overflow-x-auto">
            {htmlCode}
          </pre>
          <button
            onClick={() => copy(htmlCode, "html")}
            className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-neutral-700 text-white"
          >
            {copied === "html" ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* MARKDOWN */}
      <div>
        <p className="text-xs text-neutral-500 mb-2">Markdown</p>
        <div className="relative">
          <pre className="bg-neutral-900 text-neutral-100 text-xs p-4 rounded-lg overflow-x-auto">
            {markdownCode}
          </pre>
          <button
            onClick={() => copy(markdownCode, "md")}
            className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-neutral-700 text-white"
          >
            {copied === "md" ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

    </div>
  );
}
