'use client';

import Link from "next/link";

export function GetBadgeCTA({ resultId }: { resultId: string }) {
  return (
    <div className="flex justify-center my-10">
      <Link
        href={`/get-badge/${resultId}`}
        className="
          inline-flex items-center gap-3
          px-10 py-5 rounded-full
          bg-black text-white
          text-lg font-semibold
          shadow-lg shadow-black/10
          hover:bg-neutral-800
          hover:scale-[1.02]
          active:scale-[0.98]
          transition
        "
      >
        🏷️ Get your personality badge
      </Link>
    </div>
  );
}
