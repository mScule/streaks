import {AiOutlineFire as AppIcon} from "react-icons/ai";

export function Logo() {
  return (
    <div className="flex flex-row gap-3 items-center w-fit h-fit px-3">
      <span className={"text-xl font-bold"}>Streaks</span>
      <AppIcon size={24} />
    </div>
  );
}
