import {resolveRarityFromDays} from "@/functions/resolve-rarity-from-days";
import {StreakIcon} from "./streak-icon";
import {resolveRarityColor} from "@/functions/resolve-rarity-color";
import clsx from "clsx";

type Props = {
  days: number;
};

export function StreakCounter({days}: Props) {
  const rarity = resolveRarityFromDays(days);

  return (
    <button className={clsx(
      "pl-3 pr-4 py-1 gap-1 border rounded-4xl flex flex-row items-center justify-between",
      resolveRarityColor(rarity, "border"),
      "bg-radial-[at_50%_100%]", resolveRarityColor(rarity, "gradient"))}>
      <StreakIcon rarity={rarity} />
      <span className={clsx("text-xl font-bold",resolveRarityColor(rarity))}>{days}</span>
    </button>
  );
}
