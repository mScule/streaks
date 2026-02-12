import {AiFillFire as AppIcon} from "react-icons/ai";
import type {Rarity} from "@/types/rarity";
import {resolveRarityColor} from "@/functions/resolve-rarity-color";

type Props = {
  rarity: Rarity;
};

export function StreakIcon({rarity}: Props) {
  return <AppIcon size={24} className={resolveRarityColor(rarity)} />;
}
