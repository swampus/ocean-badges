export type OceanTrait =
  | "openness"
  | "conscientiousness"
  | "extraversion"
  | "agreeableness"
  | "neuroticism";

export type TraitLevel =
  | "low"
  | "moderate-low"
  | "balanced"
  | "moderate-high"
  | "high";

export interface TraitText {
  title: string;
  description: string;
}

export type TraitTextMap = {
  balanced: TraitText;
} & Partial<Record<TraitLevel, TraitText>>;

export interface TraitInterpretation {
  level: TraitLevel;
  title: string;
  description: string;
}
