import {useState} from "react";
import {toast} from "sonner";
import {Button} from "@/shadcn/ui/button";
import {FieldGroup} from "@/shadcn/ui/field";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn/ui/dialog";
import type {WithId} from "@/types/with-id";
import {RotateCcwIcon} from "lucide-react";
import {TypographyP} from "@/shadcn/typography/typography-p";
import type {Streak} from "@/types/streak";
import {useUpdateStreak} from "@/react-query/hooks/streak/use-update-streak";
import {isoDateStringFromDate} from "@/functions/iso-date-string-from-date";
import {resolveRarityFromDays} from "@/functions/resolve-rarity-from-days";
import {resolveDaysFromResets} from "@/functions/resolve-rarity-from-resets";
import StreakCardButton from "@/components/streak-card-button";

type Props = {
  streak: WithId<Streak>;
};

export function StreakResetForm({streak}: Props) {
  const updateStreak = useUpdateStreak();

  const rarity = resolveRarityFromDays(resolveDaysFromResets(streak.resets));

  const [isOpen, setIsOpen] = useState(false);

  async function submitResetStreak() {
    try {
      await updateStreak.mutateAsync({
        id: streak.id,
        streak: {
          resets: Array.from(new Set([...streak.resets, isoDateStringFromDate(new Date())]))
        }
      });
      toast.success(`Streak ${streak.name} resetted`);
      setIsOpen(false);
    } catch {
      toast.error(`Error resetting streak`);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => setIsOpen(isOpen)}>
      <DialogTrigger asChild>
        <StreakCardButton rarity={rarity}>
          <span>Reset</span>
          <RotateCcwIcon size={16} />
        </StreakCardButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset streak</DialogTitle>
        </DialogHeader>

        <FieldGroup>
          <TypographyP>
            Do you want to <b className="text-yellow-500">reset</b> "{streak.name}" ?
          </TypographyP>
          <Button variant="outline" type="submit" onClick={submitResetStreak}>
            <span>Reset</span>
            <RotateCcwIcon />
          </Button>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
