import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Field, FieldGroup, FieldLabel} from "@/shadcn/ui/field";
import {Input} from "@/shadcn/ui/input";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn/ui/dialog";
import {Button} from "@/shadcn/ui/button";
import z from "zod";
import {useState} from "react";
import {PenIcon} from "lucide-react";
import {NameSchema} from "@/form-value-schemas/name-schema";
import {FieldError} from "../components/field-error";
import {useUpdateStreak} from "@/react-query/hooks/streak/use-update-streak";
import type {WithId} from "@/types/with-id";
import type {Streak} from "@/types/streak";
import {resolveRarityFromDays} from "@/functions/resolve-rarity-from-days";
import {resolveDaysFromResets} from "@/functions/resolve-rarity-from-resets";
import clsx from "clsx";
import {resolveRarityColor} from "@/functions/resolve-rarity-color";
import StreakCardButton from "@/components/streak-card-button";

const StreakEditFormSchema = z.object({
  name: NameSchema
});

type Props = {
  streak: WithId<Streak>;
};

export function StreakEditForm({streak}: Props) {
  const updateStreak = useUpdateStreak();

  const rarity = resolveRarityFromDays(resolveDaysFromResets(streak.resets));

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(StreakEditFormSchema),
    defaultValues: {
      name: ""
    }
  });

  async function submitEditStreak(edited: z.infer<typeof StreakEditFormSchema>) {
    try {
      await updateStreak.mutateAsync({
        id: streak.id,
        streak: {
          name: edited.name
        }
      });
      toast.success(`Streak edited`);
      form.reset();
      setIsOpen(false);
    } catch {
      toast.error(`Error creating streak`);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => setIsOpen(isOpen)}>
      <DialogTrigger asChild>
        <StreakCardButton rarity={rarity}>
          <span>Edit</span>
          <PenIcon size={16} />
        </StreakCardButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit streak</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(submitEditStreak)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({field, fieldState}) => (
                <>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Name</FieldLabel>
                    <Input placeholder={streak.name} {...field} />
                  </Field>
                  {fieldState.error && <FieldError message={fieldState.error.message} />}
                </>
              )}
            />
            <Button variant="outline" type="submit">
              <span>Edit</span>
              <PenIcon />
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
