// src/db/resultsStore.ts

import type { BigFiveProfile } from "@/lib/bigfive";

const store = new Map<string, BigFiveProfile>();

export function saveResult(profile: BigFiveProfile): string {
  const id = "local-result"; // пока один, позже сделаем UUID
  store.set(id, profile);
  return id;
}

export function getResult(id: string): BigFiveProfile | null {
  return store.get(id) ?? null;
}
