import type {Rarity} from "@/types/rarity";
import {StreakIcon} from "./streak-icon";
import {StreakLabel} from "./streak-label";

type Props = {
  rarity: Rarity;
};

export function LabeledStreakIcon({rarity}: Props) {
  return (
    <div className="flex flex-row gap-1 items-center">
      <StreakIcon rarity={rarity} />
      <StreakLabel rarity={rarity} />
    </div>
  );
}
