import Image from "next/image";
import { Navbar } from "@/components/Navbar";

export default function IdeaPage() {
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
            The Idea Behind the Project
          </h1>

          <p className="mt-3 text-neutral-500">
            A structured exploration of personality as a social signal
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-12 text-neutral-700 leading-relaxed">

          {/* DISCLAIMER */}
          <section className="text-sm text-neutral-500 border-l-4 border-neutral-300 pl-4">
            This page is not a scientific paper or a clinical study.
            It presents a structured idea and an ongoing social experiment.
          </section>

          {/* PROBLEM */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              The problem
            </h2>
            <p>
              In digital environments — social networks, messengers, forums —
              people often lack sufficient context to understand
              <em> how to communicate with each other</em>.
            </p>
            <p className="mt-3">
              Photographs, short biographies, and job titles provide limited insight
              into how a person thinks, reacts, explains ideas, or responds to uncertainty.
            </p>
          </section>

          {/* HYPOTHESIS */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              The hypothesis
            </h2>
            <p>
              A lightweight, voluntary, non-clinical personality signal
              may reduce friction in communication between people,
              especially during first contact.
            </p>
            <p className="mt-3">
              The Big Five personality model offers a well-researched,
              culturally transferable framework that can serve as such a signal —
              without ranking, labeling, or evaluating individuals.
            </p>
          </section>

          {/* WHY BIG FIVE */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              Why the Big Five?
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Traits are relatively stable over time</li>
              <li>The model is widely researched and cross-cultural</li>
              <li>Traits exist on continuous spectra, not categories</li>
              <li>No trait is inherently better or worse than another</li>
            </ul>
          </section>

          {/* BADGE */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              Why a badge?
            </h2>
            <p>
              The badge is a compact visual representation of a personality profile.
              It is:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Voluntary</li>
              <li>Non-clinical</li>
              <li>Not tied to personal identity</li>
              <li>Easy to share or ignore</li>
            </ul>
            <p className="mt-3">
              It does not describe who a person <em>is</em>,
              but offers a hint about how they may prefer to interact.
            </p>
          </section>

          {/* SOCIAL EXPERIMENT */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              A social experiment
            </h2>
            <p>
              If many people voluntarily adopt such badges,
              communication dynamics may subtly change.
            </p>
            <p className="mt-3">
              It may become easier to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Find like-minded individuals</li>
              <li>Adjust tone and level of explanation</li>
              <li>Share ideas, tasks, or even humor more appropriately</li>
            </ul>
          </section>

          {/* FUTURE AI */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              Looking forward
            </h2>
            <p>
              In future hybrid systems where humans and AI agents collaborate,
              explicitly shared personality signals may help AI systems
              adapt communication styles more effectively.
            </p>
            <p className="mt-3">
              This could include adjusting:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Level of detail</li>
              <li>Structure of explanations</li>
              <li>Interaction pacing</li>
            </ul>
            <p className="mt-3">
              This project does not attempt to predict such systems,
              but explores a possible direction.
            </p>
          </section>

          {/* PRIVACY */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              Privacy and ethics
            </h2>
            <p>
              Participation is entirely voluntary.
              No personal data, accounts, or identifiers are required.
            </p>
            <p className="mt-3">
              The badge is a contextual signal, not a judgment,
              and should not be used for selection, evaluation, or exclusion.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
