import { OCEAN_RANGES, OCEAN_DESCRIPTIONS } from "@/config/oceanDescriptions";
import { OceanTrait, TraitInterpretation } from "@/types/ocean";

export function interpretTrait(
  trait: OceanTrait,
  value: number
): TraitInterpretation {
  const range = OCEAN_RANGES.find(
    r => value >= r.min && value < r.max
  )!;

  const texts = OCEAN_DESCRIPTIONS[trait];
  const text = texts[range.level] ?? texts.balanced;

  return {
    level: range.level,
    title: text.title,
    description: text.description
  };
}
