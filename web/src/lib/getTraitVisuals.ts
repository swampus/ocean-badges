import { OceanTrait, TraitLevel } from "@/types/ocean";
import { TRAIT_ANIMALS, LEVEL_BADGES } from "@/config/oceanAnimals";

export function getTraitVisuals(trait: OceanTrait, level: TraitLevel) {
  return {
    animal: TRAIT_ANIMALS[trait],
    badge: LEVEL_BADGES[level]
  };
}
