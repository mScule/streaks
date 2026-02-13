import {useState} from "react";
import {toast} from "sonner";
import {Button} from "@/shadcn/ui/button";
import {FieldGroup} from "@/shadcn/ui/field";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn/ui/dialog";
import type {WithId} from "@/types/with-id";
import {TrashIcon} from "lucide-react";
import {TypographyP} from "@/shadcn/typography/typography-p";
import type {Streak} from "@/types/streak";
import {useDeleteStreak} from "@/react-query/hooks/streak/use-delete-streak";

type Props = {
  streak: WithId<Streak>;
};

export function StreakDeletionForm({streak}: Props) {
  const deleteStreak = useDeleteStreak();

  const [isOpen, setIsOpen] = useState(false);

  async function submitDeleteStreak() {
    try {
      await deleteStreak.mutateAsync({
        id: streak.id
      });
      toast.success(`Streak "${streak.name}" deleted`);
      setIsOpen(false);
    } catch {
      toast.error(`Error deleting streak`);
    }
  }

  return (
    <Dialog  open={isOpen} onOpenChange={isOpen => setIsOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <span>Delete</span>
          <TrashIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete streak</DialogTitle>
        </DialogHeader>

        <FieldGroup>
          <TypographyP>
            Do you want to <b className="text-red-600">delete</b> "{streak.name}" ?
          </TypographyP>
          <Button variant="outline" type="submit" onClick={submitDeleteStreak}>
            <span>Delete</span>
            <TrashIcon />
          </Button>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
