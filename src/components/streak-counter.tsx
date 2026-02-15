import {resolveRarityFromDays} from "@/functions/resolve-rarity-from-days";
import {StreakIcon} from "./streak-icon";
import {resolveRarityColor} from "@/functions/resolve-rarity-color";
import clsx from "clsx";

type Props = {
  days: number;
  target?: number;
};

export function StreakCounter({days, target}: Props) {
  const rarity = resolveRarityFromDays(days);
  const color = resolveRarityColor(rarity);

  return (
    <button
      className={clsx(
        "pl-2 pr-3 py-0.5 gap-1 border rounded-4xl flex flex-row items-center justify-between",
        resolveRarityColor(rarity, "border"),
        "bg-radial-[at_50%_100%]",
        resolveRarityColor(rarity, "gradient")
      )}>
      <StreakIcon rarity={rarity} />
      <div className="flex flex-row items-center gap-0.5">
        <span className={clsx("text-l font-bold", color)}>{days}</span>
        {target && (
          <>
            <span className={clsx("font-bold text-xs", color)}>/</span>
            <span className={clsx("text-l font-bold", color)}>{target}</span>
          </>
        )}
      </div>
    </button>
  );
}
