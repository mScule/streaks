import type {ButtonHTMLAttributes, PropsWithChildren} from "react";
import type {Rarity} from "@/types/rarity";
import clsx from "clsx";
import {resolveRarityColor} from "@/functions/resolve-rarity-color";

type Props = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    rarity: Rarity;
  };

export default function StreakCardButton({rarity, children, className, ...rest}: Props) {
  const textColor = resolveRarityColor(rarity, "text");
  const borderColor = resolveRarityColor(rarity, "border");

  return (
    <button
      className={clsx(
        "flex flex-row items-center gap-2",
        "text-sm font-bold p-1.5 border rounded-md",
        textColor,
        borderColor
      )}
      {...rest}>
      {children}
    </button>
  );
}
