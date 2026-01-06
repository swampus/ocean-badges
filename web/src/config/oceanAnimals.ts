import { OceanTrait, TraitLevel } from "@/types/ocean";

export type AnimalKey = "lion" | "elephant" | "buffalo" | "rhino" | "leopard";

export interface AnimalMeta {
  key: AnimalKey;
  emoji: string;
  name: string;
  tagline: string;
}

export const TRAIT_ANIMALS: Record<OceanTrait, AnimalMeta> = {
  // E — social energy / presence
  extraversion: {
    key: "lion",
    emoji: "🦁",
    name: "Lion",
    tagline: "Presence & social energy"
  },

  // A — warmth / prosocial tendencies
  agreeableness: {
    key: "elephant",
    emoji: "🐘",
    name: "Elephant",
    tagline: "Warmth & cooperation"
  },

  // C — persistence / discipline / structure
  conscientiousness: {
    key: "rhino",
    emoji: "🦏",
    name: "Rhinoceros",
    tagline: "Discipline & consistency"
  },

  // O — curiosity / exploration / novelty
  openness: {
    key: "leopard",
    emoji: "🐆",
    name: "Leopard",
    tagline: "Curiosity & exploration"
  },

  // N — reactivity / vigilance
  neuroticism: {
    key: "buffalo",
    emoji: "🐃",
    name: "Buffalo",
    tagline: "Vigilance & emotional reactivity"
  }
};

export const LEVEL_BADGES: Record<TraitLevel, { label: string; hint: string }> = {
  low: { label: "Low", hint: "More stable / less expressed" },
  "moderate-low": { label: "Moderate-Low", hint: "Slightly less expressed" },
  balanced: { label: "Balanced", hint: "Typical range / flexible" },
  "moderate-high": { label: "Moderate-High", hint: "Slightly more expressed" },
  high: { label: "High", hint: "Strongly expressed" }
};
