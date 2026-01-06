import { OceanTrait, TraitInterpretation } from "@/types/ocean";
import { getTraitVisuals } from "@/lib/getTraitVisuals";

interface TraitCardProps {
  trait: OceanTrait;
  value: number;
  interpretation: TraitInterpretation;
}

const TRAIT_LABELS: Record<OceanTrait, string> = {
  openness: "Openness",
  conscientiousness: "Conscientiousness",
  extraversion: "Extraversion",
  agreeableness: "Agreeableness",
  neuroticism: "Neuroticism"
};

export function TraitCard({ trait, value, interpretation }: TraitCardProps) {
  const { animal, badge } = getTraitVisuals(trait, interpretation.level);

  return (
    <div className="h-full rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6 flex flex-col">
      <div className="flex items-start gap-6 flex-1">

        {/* Animal */}
        <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center text-3xl">
          {animal.emoji}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-neutral-500">
                {TRAIT_LABELS[trait]}
              </div>
              <div className="text-xl font-semibold">
                {interpretation.title}
              </div>
            </div>

            <span className="text-xs px-3 py-1 rounded-full border border-neutral-200 text-neutral-600">
              {badge.label}
            </span>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-neutral-500 mb-1">
              <span>{value.toFixed(1)}%</span>
            </div>

            <div className="h-2 w-full rounded-full bg-neutral-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-neutral-900 transition-all"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed line-clamp-3">
            {interpretation.description}
          </p>
        </div>
      </div>
    </div>
  );
}
