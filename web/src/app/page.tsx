import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 relative">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* HERO */}
        <section className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/bigfivelogo.png"
              alt="Big Five"
              width={420}
              height={140}
              priority
            />
          </div>

          <h1 className="text-4xl font-semibold tracking-tight">
            Big Five Personality Profile
          </h1>

          <p className="mt-2 text-neutral-500">
            Five traits. One balanced profile.
          </p>

          <div className="mt-6">
            <Link
              href="/test"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full
                         bg-black text-white text-lg font-medium
                         hover:bg-neutral-800 transition"
            >
              🐾 Start the test
            </Link>
          </div>

          <p className="mt-3 text-sm text-neutral-400">
            Takes 5–15 minutes · No registration · No tracking
          </p>

          <p className="mt-4 text-sm text-neutral-500 max-w-xl mx-auto">
            This is not a test to classify or judge you.
            It’s a way to visualize how different personality traits combine —
            and how people with similar profiles may recognize each other.
          </p>
        </section>

        {/* VALUE PROPS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: "🧠",
              title: "Understand your personality",
              text:
                "A scientifically grounded Big Five (OCEAN) test that shows how your traits are structured — without labels or diagnoses."
            },
            {
              icon: "🏷️",
              title: "A shareable personality badge",
              text:
                "Turn your profile into a simple visual signal you can share in chats, profiles, or social platforms."
            },
            {
              icon: "🐘",
              title: "A social experiment",
              text:
                "Exploring whether people with similar personality patterns recognize each other more easily."
            },
            {
              icon: "🔒",
              title: "No personal data",
              text:
                "No accounts, no emails, no tracking. Your personality profile is not linked to your identity."
            },
            {
              icon: "🦁",
              title: "Inspired by the African Big Five",
              text:
                "Just like the African Big Five, each trait represents a different kind of strength. No hierarchy — balance matters."
            },
            {
              icon: "💻",
              title: "Open source by design",
              text:
                "Fully open source under the MIT license. No black boxes, no hidden logic."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="text-base font-semibold mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </section>
      </div>

      {/* GITHUB LINK — BOTTOM RIGHT */}
      <div className="fixed bottom-4 right-6 text-sm text-neutral-400">
        <span className="mr-1">Open source:</span>
        <a
          href="https://github.com/swampus/ocean-badges"
          target="_blank"
          rel="noreferrer"
          className="hover:text-neutral-700 transition"
        >
          github.com/swampus/ocean-badges
        </a>
      </div>
    </main>
  );
}
