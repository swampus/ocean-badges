import { TraitLevel, TraitTextMap } from "@/types/ocean";

export const OCEAN_RANGES: {
  min: number;
  max: number;
  level: TraitLevel;
}[] = [
  { min: 0, max: 30, level: "low" },
  { min: 30, max: 45, level: "moderate-low" },
  { min: 45, max: 55, level: "balanced" },
  { min: 55, max: 70, level: "moderate-high" },
  { min: 70, max: 100, level: "high" }
];

export const OCEAN_DESCRIPTIONS: Record<string, TraitTextMap> = {
  // ───────────────── Openness ─────────────────
  openness: {
    low: {
      title: "Practical and grounded",
      description:
        "You tend to prefer familiar ideas and proven approaches, valuing practicality over experimentation."
    },
    "moderate-low": {
      title: "Selectively open",
      description:
        "You are open to new ideas when they clearly serve a purpose, but remain cautious toward unnecessary change."
    },
    balanced: {
      title: "Balanced openness",
      description:
        "You are open to new ideas when they are meaningful, without chasing novelty for its own sake."
    },
    "moderate-high": {
      title: "Curious and flexible",
      description:
        "You show curiosity toward new perspectives and are comfortable exploring alternative ways of thinking."
    },
    high: {
      title: "Highly open and exploratory",
      description:
        "You actively seek new ideas, experiences, and perspectives, often enjoying abstract or unconventional thinking."
    }
  },

  // ───────────────── Conscientiousness ─────────────────
  conscientiousness: {
    low: {
      title: "Spontaneous and flexible",
      description:
        "You prefer flexibility over strict structure, often adapting plans as situations evolve."
    },
    "moderate-low": {
      title: "Lightly structured",
      description:
        "You can organize yourself when needed, but do not feel compelled to maintain rigid routines."
    },
    balanced: {
      title: "Balanced self-discipline",
      description:
        "You can stay organized and reliable when needed, without becoming rigid."
    },
    "moderate-high": {
      title: "Reliable and methodical",
      description:
        "You tend to plan ahead and follow through on commitments while remaining reasonably adaptable."
    },
    high: {
      title: "Highly disciplined",
      description:
        "You strongly value structure, planning, and responsibility, often setting high standards for yourself."
    }
  },

  // ───────────────── Extraversion ─────────────────
  extraversion: {
    low: {
      title: "Reserved and introspective",
      description:
        "You are more comfortable with low-stimulation environments and tend to recharge through solitude."
    },
    "moderate-low": {
      title: "Quietly social",
      description:
        "You enjoy social interaction in smaller or familiar settings without seeking constant engagement."
    },
    balanced: {
      title: "Socially flexible",
      description:
        "You feel comfortable both in social situations and spending time alone."
    },
    "moderate-high": {
      title: "Engaged and expressive",
      description:
        "You enjoy social interaction and tend to express yourself openly, while still valuing personal space."
    },
    high: {
      title: "Highly outgoing",
      description:
        "You gain energy from social interaction and often seek dynamic, stimulating environments."
    }
  },

  // ───────────────── Agreeableness ─────────────────
  agreeableness: {
    low: {
      title: "Direct and independent",
      description:
        "You prioritize honesty and autonomy, sometimes valuing directness over harmony."
    },
    "moderate-low": {
      title: "Principled and selective",
      description:
        "You are cooperative when it aligns with your values, but do not hesitate to assert your position."
    },
    balanced: {
      title: "Cooperative but independent",
      description:
        "You value harmony while maintaining healthy personal boundaries."
    },
    "moderate-high": {
      title: "Empathetic and supportive",
      description:
        "You tend to be considerate of others’ needs while still preserving your own perspective."
    },
    high: {
      title: "Highly compassionate",
      description:
        "You strongly value cooperation, empathy, and maintaining positive relationships."
    }
  },

  // ───────────────── Neuroticism ─────────────────
  neuroticism: {
    low: {
      title: "Emotionally steady",
      description:
        "You tend to remain calm under pressure and are less affected by emotional fluctuations."
    },
    "moderate-low": {
      title: "Generally composed",
      description:
        "You experience emotional reactions but usually recover quickly and maintain perspective."
    },
    balanced: {
      title: "Emotionally balanced",
      description:
        "You generally handle stress without excessive reactivity."
    },
    "moderate-high": {
      title: "Emotionally sensitive",
      description:
        "You tend to react emotionally to situations, while usually remaining aware of your responses."
    },
    high: {
      title: "Highly emotionally responsive",
      description:
        "You experience emotions intensely and may be more affected by stress or uncertainty."
    }
  }
};
