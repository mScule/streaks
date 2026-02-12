import type {Rarity} from "@/types/rarity";

export function resolveRarityLabel(rarity: Rarity): string {
  switch (rarity) {
    case "common":
      return "Common";
    case "uncommon":
      return "Uncommon";
    case "rare":
      return "Rare";
    case "epic":
      return "Epic";
    case "legendary":
      return "Legendary";
    case "mythic":
      return "Mythic";
  }
}
