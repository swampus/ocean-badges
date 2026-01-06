import Link from "next/link";

export function Navbar() {
  return (
    <header className="w-full border-b border-neutral-200 bg-neutral-50">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-center gap-10 text-sm font-medium">
        <Link
          href="/"
          className="text-neutral-700 hover:text-black transition"
        >
          Home
        </Link>

        <Link
          href="/about"
          className="text-neutral-700 hover:text-black transition"
        >
          About
        </Link>

        <Link
          href="/idea"
          className="text-neutral-700 hover:text-black transition"
        >
          Idea
        </Link>

      </nav>
    </header>
  );
}
