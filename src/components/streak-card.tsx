import type {Streak} from "@/types/streak";
import {StreakCounter} from "./streak-counter";
import {StreakResetForm} from "../forms/streak-reset-form";
import {StreakDeletionForm} from "../forms/streak-deletion-form";
import type {WithId} from "@/types/with-id";
import clsx from "clsx";
import {resolveRarityColor} from "@/functions/resolve-rarity-color";
import {resolveRarityFromDays} from "@/functions/resolve-rarity-from-days";
import {StreakEditForm} from "@/forms/streak-edit-form";
import {resolveDaysFromResets} from "@/functions/resolve-rarity-from-resets";
import {first} from "lodash";
import {StreakLabel} from "./streak-label";

type Props = {
  streak: WithId<Streak>;
};

export function StreakCard({streak}: Props) {
  const days = resolveDaysFromResets(streak.resets);
  const rarity = resolveRarityFromDays(days);

  return (
    <div
      className={clsx(
        "max-w-80 min-w-80 flex flex-col border rounded-xl bg-radial-[at_50%_100%]",
        resolveRarityColor(rarity, "gradient"),
        resolveRarityColor(rarity, "border")
      )}>
      <div className="flex flex-col gap-7 p-3">
        <div className="flex flex-row gap-2 justify-between items-center">
          <span className={clsx("font-bold", resolveRarityColor(rarity, "text"))}>{streak.name}</span>
          <div className="flex flex-col gap-2 items-center">
            <StreakCounter days={days} target={streak.target} />
            <StreakLabel rarity={rarity} />
          </div>
        </div>

        {streak.rules && (
          <div>
            <span className={clsx(resolveRarityColor(rarity), "font-bold text-xs")}>Rules:</span>
            {streak.rules.split("\n").map(line => (
              <p key={line} className={clsx(resolveRarityColor(rarity), "text-xs italic")}>
                {line}
              </p>
            ))}
          </div>
        )}

        <div className="flex flex-row justify-between">
          <span className={clsx("text-xs italic", resolveRarityColor(rarity, "text"))}>
            Created at: <b>{new Date(first(streak.resets)!).toLocaleDateString()}</b>
          </span>
          <span className={clsx("text-xs italic", resolveRarityColor(rarity, "text"))}>
            Resets: <b>{streak.resets.length - 1}</b>
          </span>
        </div>
      </div>
      <div className={clsx("border-b w-full", resolveRarityColor(rarity, "border"))} />
      <div className="flex flex-row justify-evenly p-3">
        <StreakResetForm streak={streak} />
        <StreakEditForm streak={streak} />
        <StreakDeletionForm streak={streak} />
      </div>
    </div>
  );
}
