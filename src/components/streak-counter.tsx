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
    <div className={clsx(
      "pl-2 pr-3 py-0.5 gap-1 border rounded-4xl flex flex-row items-center justify-between",
      resolveRarityColor(rarity, "border"),
      "bg-radial-[at_50%_100%]", resolveRarityColor(rarity, "gradient"))}>
      <StreakIcon rarity={rarity} />
      <span className={resolveRarityColor(rarity)}>{days}</span>
    </div>
  );
}
