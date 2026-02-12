import type {Rarity} from "@/types/rarity";

type Target = "text" | "border" | "gradient";

export function resolveRarityColor(rarity: Rarity, target: Target = "text"): string {
  switch (target) {
    case "text": {
      switch (rarity) {
        case "common":
          return "text-slate-400";
        case "uncommon":
          return "text-green-600";
        case "rare":
          return "text-blue-600";
        case "epic":
          return "text-purple-600";
        case "legendary":
          return "text-amber-600";
        case "mythic":
          return "text-cyan-600";
      }
    }
    case "border": {
      switch (rarity) {
        case "common":
          return "border-slate-700";
        case "uncommon":
          return "border-green-900";
        case "rare":
          return "border-blue-900";
        case "epic":
          return "border-purple-900";
        case "legendary":
          return "border-amber-900";
        case "mythic":
          return "border-cyan-900";
      }
    }
    case "gradient": {
      switch (rarity) {
        case "common":
          return "from-slate-700";
        case "uncommon":
          return "from-green-900";
        case "rare":
          return "from-blue-900";
        case "epic":
          return "from-purple-900";
        case "legendary":
          return "from-amber-900";
        case "mythic":
          return "from-cyan-900";
      }
    }
  }
}
