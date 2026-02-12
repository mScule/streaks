import type {Streak} from "@/types/streak";
import {differenceInDays} from "date-fns";

import {last} from "lodash";

import {StreakCounter} from "./streak-counter";
import {StreakResetForm} from "./forms/streak-reset-form";
import {StreakDeletionForm} from "./forms/streak-deletion-form";
import type {WithId} from "@/types/with-id";
import clsx from "clsx";
import { resolveRarityColor } from "@/functions/resolve-rarity-color";
import { resolveRarityFromDays } from "@/functions/resolve-rarity-from-days";

type Props = {
  streak: WithId<Streak>;
};

export function StreakCard({streak}: Props) {
  const now = new Date();

  const latestReset = new Date(last(streak.resets)!);
  const days = differenceInDays(now, latestReset);
  const rarity = resolveRarityFromDays(days);

  return (
    <div key={streak.id} className={clsx(
        "max-w-80 min-w-80 flex flex-col gap-5 border rounded-xl p-4 bg-radial-[at_50%_100%]",
        resolveRarityColor(rarity, "gradient"),
        resolveRarityColor(rarity, "border")
      )}>
      <div className="flex flex-row gap-2 justify-between items-start">
        <span className="font-bold">{streak.name}</span>
        <StreakCounter days={days} />
      </div>
      <div className="flex flex-row gap-2 justify-end">
        <StreakResetForm streak={streak} />
        <StreakDeletionForm streak={streak} />
      </div>
    </div>
  );
}
