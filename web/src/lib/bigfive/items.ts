import questions from "@questions/data/en/questions";
import type { BigFiveItemMeta, BigFiveTrait } from "./calculateBigFiveProfile";

export const BIGFIVE_ITEMS_META: BigFiveItemMeta[] = questions.map((q: any) => ({
  id: q.id,
  trait: q.domain as BigFiveTrait,
  reverse: q.keyed === "minus",
}));
