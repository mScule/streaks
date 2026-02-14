import type {Streak} from "@/types/streak";
import {StreakCounter} from "./streak-counter";
import {StreakResetForm} from "../forms/streak-reset-form";
import {StreakDeletionForm} from "../forms/streak-deletion-form";
import type {WithId} from "@/types/with-id";
import clsx from "clsx";
import {resolveRarityColor} from "@/functions/resolve-rarity-color";
import {resolveRarityFromDays} from "@/functions/resolve-rarity-from-days";
import {StreakEditForm} from "@/forms/streak-edit-form";
import { resolveDaysFromResets } from "@/functions/resolve-rarity-from-resets";

type Props = {
  streak: WithId<Streak>;
};

export function StreakCard({streak}: Props) {
  const days = resolveDaysFromResets(streak.resets)
  const rarity = resolveRarityFromDays(days);

  return (
    <div
      className={clsx(
        "max-w-80 min-w-80 flex flex-col gap-7 border rounded-xl p-4 bg-radial-[at_50%_100%]",
        resolveRarityColor(rarity, "gradient"),
        resolveRarityColor(rarity, "border")
      )}>
      <div className="flex flex-row gap-2 justify-between items-start">
        <span className={clsx("font-bold", resolveRarityColor(rarity, "text"))}>{streak.name}</span>
        <StreakCounter days={days} />
      </div>
      <div className="flex flex-row gap-2 justify-between">
        <StreakResetForm streak={streak} />
        <StreakEditForm streak={streak} />
        <StreakDeletionForm streak={streak} />
      </div>
    </div>
  );
}
