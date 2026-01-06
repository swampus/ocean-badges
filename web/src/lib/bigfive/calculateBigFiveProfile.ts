// bigfive/calculateBigFiveProfile.ts

export type BigFiveTrait = "O" | "C" | "E" | "A" | "N";

export type BigFiveAnswer = {
  itemId: string;   // unique question id (e.g., "q12")
  value: number;    // Likert value, e.g. 1..5
};

export type BigFiveItemMeta = {
  id: string;                 // same as itemId
  trait: BigFiveTrait;        // O/C/E/A/N
  reverse?: boolean;          // true if reverse-keyed
};

export type BigFiveProfile = {
  traits: Record<BigFiveTrait, {
    rawMean: number;          // mean in original scale (e.g. 1..5)
    percent: number;          // 0..100
    answered: number;         // number of matched answers for this trait
  }>;
  meta: {
    scaleMin: number;
    scaleMax: number;
    totalAnswered: number;
    totalItemsMatched: number;
  };
};

export type CalculateOptions = {
  scaleMin?: number;          // default 1
  scaleMax?: number;          // default 5
  // If true: ignore answers that are outside the scale instead of throwing.
  ignoreInvalidAnswers?: boolean;
};

/**
 * Calculate OCEAN profile from answers.
 *
 * Pure function:
 * - No IO, no randomness, no global state.
 * - Deterministic output.
 *
 * Requirements:
 * - answers should contain itemId and numeric value in [scaleMin..scaleMax]
 * - itemsMeta should define mapping item -> trait and reverse flag
 */
export function calculateBigFiveProfile(
  answers: BigFiveAnswer[],
  itemsMeta: BigFiveItemMeta[],
  options: CalculateOptions = {}
): BigFiveProfile {
  const scaleMin = options.scaleMin ?? 1;
  const scaleMax = options.scaleMax ?? 5;
  const ignoreInvalid = options.ignoreInvalidAnswers ?? false;

  if (scaleMin >= scaleMax) {
    throw new Error(`Invalid scale: scaleMin (${scaleMin}) must be < scaleMax (${scaleMax}).`);
  }

  // Build lookup for item metadata
  const metaById = new Map<string, BigFiveItemMeta>();
  for (const meta of itemsMeta) {
    metaById.set(meta.id, meta);
  }

  const traitScores: Record<BigFiveTrait, number[]> = {
    O: [],
    C: [],
    E: [],
    A: [],
    N: [],
  };

  let totalAnswered = 0;
  let totalItemsMatched = 0;

  for (const a of answers) {
    totalAnswered++;

    const meta = metaById.get(a.itemId);
    if (!meta) {
      // Answer does not correspond to known Big Five item (maybe future/extra questions).
      continue;
    }
    totalItemsMatched++;

    const value = a.value;

    const isValid = Number.isFinite(value) && value >= scaleMin && value <= scaleMax;
    if (!isValid) {
      if (ignoreInvalid) continue;
      throw new Error(
        `Invalid answer value for itemId=${a.itemId}. ` +
        `Expected number in [${scaleMin}..${scaleMax}], got: ${value}`
      );
    }

    const scored = meta.reverse
      ? (scaleMin + scaleMax) - value
      : value;

    traitScores[meta.trait].push(scored);
  }

  const traits: BigFiveProfile["traits"] = {
    O: buildTrait(traitScores.O, scaleMin, scaleMax),
    C: buildTrait(traitScores.C, scaleMin, scaleMax),
    E: buildTrait(traitScores.E, scaleMin, scaleMax),
    A: buildTrait(traitScores.A, scaleMin, scaleMax),
    N: buildTrait(traitScores.N, scaleMin, scaleMax),
  };

  return {
    traits,
    meta: {
      scaleMin,
      scaleMax,
      totalAnswered,
      totalItemsMatched,
    },
  };
}

function buildTrait(scores: number[], scaleMin: number, scaleMax: number) {
  const answered = scores.length;

  if (answered === 0) {
    return { rawMean: 0, percent: 0, answered: 0 };
  }

  const sum = scores.reduce((acc, x) => acc + x, 0);
  const rawMean = sum / answered;

  // Normalize to 0..100
  const percent = ((rawMean - scaleMin) / (scaleMax - scaleMin)) * 100;

  return {
    rawMean: round(rawMean, 4),
    percent: clamp(round(percent, 2), 0, 100),
    answered,
  };
}

function clamp(x: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, x));
}

function round(x: number, digits: number) {
  const p = Math.pow(10, digits);
  return Math.round(x * p) / p;
}
