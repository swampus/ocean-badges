import Image from "next/image";
import Link from "next/link";

import { redis } from "@/lib/redis";
import { interpretTrait } from "@/lib/interpretOcean";
import { TraitCard } from "@/components/TraitCard";
import { OceanTrait } from "@/types/ocean";
import { Navbar } from "@/components/Navbar";
import { GetBadgeCTA } from "@/components/GetBadgeCTA";

export const dynamic = "force-dynamic";

export default async function ResultPage({
  params
}: {
  params: { id: string };
}) {
  const raw = await redis.get(`result:${params.id}`);

  if (!raw) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl">Result not found</h1>
      </div>
    );
  }

  const profile = raw;

  const traits: Record<OceanTrait, number> = {
    openness: profile.traits.O.percent,
    conscientiousness: profile.traits.C.percent,
    extraversion: profile.traits.E.percent,
    agreeableness: profile.traits.A.percent,
    neuroticism: profile.traits.N.percent
  };

  const TRAITS: OceanTrait[] = [
    "openness",
    "conscientiousness",
    "extraversion",
    "agreeableness",
    "neuroticism"
  ];

  const interpreted = TRAITS.map(trait => ({
    trait,
    value: traits[trait],
    interpretation: interpretTrait(trait, traits[trait])
  }));

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/bigfivelogo.png"
            alt="Big Five Profile"
            width={420}
            height={140}
            priority
          />
        </div>

        {/* TITLE */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            Your Big Five Profile
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Five traits. One balanced profile.
          </p>
        </div>

        {/* MENU */}
        <Navbar />
        <GetBadgeCTA resultId={params.id} />

        {/* RESULTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          {interpreted.map(t => (
            <TraitCard
              key={t.trait}
              trait={t.trait}
              value={t.value}
              interpretation={t.interpretation}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
