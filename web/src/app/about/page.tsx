import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/bigfivelogo.png"
              alt="Big Five"
              width={420}
              height={140}
              priority
            />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            About this project
          </h1>

          <p className="mt-3 text-neutral-500">
            A visual, non-clinical interpretation of the Big Five personality model
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-12 text-neutral-700 leading-relaxed">

          {/* WHAT IS IT */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              What is this?
            </h2>
            <p>
              This project is based on the <strong>Big Five (OCEAN)</strong> personality model —
              one of the most widely accepted and researched frameworks in modern psychology.
            </p>
            <p className="mt-3">
              Instead of producing a clinical report or a numerical breakdown,
              this project focuses on a <strong>clear, visual and human-readable profile</strong>
              that helps people understand themselves and each other.
            </p>
          </section>

          {/* NOT A DIAGNOSIS */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              What this is not
            </h2>
            <p>
              This test is <strong>not a medical or psychological diagnosis</strong>.
              It does not label people, rank them, or determine their value, abilities,
              or suitability for any role.
            </p>
            <p className="mt-3">
              All traits exist on a spectrum. There are no “good” or “bad” results —
              only different balances.
            </p>
          </section>

          {/* SOCIAL IDEA */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              A social experiment
            </h2>
            <p>
              One of the goals of this project is to explore whether shared personality traits
              can help people recognize like-minded individuals more easily —
              in conversations, communities, or collaborative environments.
            </p>
            <p className="mt-3">
              For this reason, the result can be represented as a <strong>shareable badge</strong>
              that is not tied to any personal identity.
            </p>
          </section>

          {/* AFRICAN BIG FIVE */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              Inspired by the African Big Five
            </h2>
            <p>
              The visual language of this project is inspired by the
              <strong> African Big Five</strong> —
              lion, leopard, elephant, buffalo, and rhinoceros.
            </p>
            <p className="mt-3">
              Each animal represents a different kind of strength.
              None is superior to the others — balance and context matter.
              The same principle applies to personality traits.
            </p>
          </section>

          {/* PRIVACY */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              Privacy & transparency
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>No registration</li>
              <li>No email collection</li>
              <li>No tracking or analytics</li>
              <li>No personal data stored with results</li>
            </ul>
            <p className="mt-3">
              Results are anonymous and identified only by a random ID.
            </p>
          </section>

          {/* OPEN SOURCE */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              Open source
            </h2>
            <p>
              This project is fully open source and released under the MIT license.
            </p>
            <p className="mt-3">
              You can explore the code, fork it, or adapt it for your own experiments:
            </p>

            <a
              href="https://github.com/swampus/ocean-badges"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 font-medium text-neutral-900 hover:underline"
            >
              github.com/swampus/ocean-badges
            </a>
          </section>

        </div>

        {/* FOOTER CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/test"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full
                       bg-black text-white text-lg font-medium
                       hover:bg-neutral-800 transition"
          >
            🐾 Take the test
          </Link>
        </div>

      </div>
    </main>
  );
}
