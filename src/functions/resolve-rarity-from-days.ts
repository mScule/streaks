import type {Rarity} from "@/types/rarity";

const weeks = (amount: number) => amount * 7;
const months = (amount: number) => amount * 7 * 4;
const years = (amount: number) => amount * 7 * 4 * 12;

export function resolveRarityFromDays(days: number): Rarity {
  if (days <= 3) {
    return "common";
  }
  if (days <= weeks(1)) {
    return "uncommon";
  }
  if (days <= weeks(2)) {
    return "rare";
  }
  if (days <= months(1)) {
    return "epic";
  }
  if (days <= years(1)) {
    return "legendary";
  }

  return "mythic";
}
