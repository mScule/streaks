import type {Rarity} from "@/types/rarity";
import {resolveRarityColor} from "@/functions/resolve-rarity-color";
import {resolveRarityLabel} from "@/functions/resolve-rarity-label";
import clsx from "clsx";

type Props = {
  rarity: Rarity;
};

export function StreakLabel({rarity}: Props) {
  const color = resolveRarityColor(rarity);
  const label = resolveRarityLabel(rarity);

  return <span className={clsx(color, "text-xs font-bold italic")}>{label}</span>;
}
