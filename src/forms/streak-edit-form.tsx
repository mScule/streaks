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
import StreakCardButton from "@/components/streak-card-button";
import {Checkbox} from "@/shadcn/ui/checkbox";
import {Textarea} from "@/shadcn/ui/textarea";

const StreakEditFormSchema = z.object({
  name: NameSchema.optional(),
  rules: z.string(),
  target: z.string()
});

type Props = {
  streak: WithId<Streak>;
};

export function StreakEditForm({streak}: Props) {
  const updateStreak = useUpdateStreak();

  const rarity = resolveRarityFromDays(resolveDaysFromResets(streak.resets));

  const [isOpen, setIsOpen] = useState(false);

  const [includeRules, setIncludeRules] = useState(Boolean(streak.rules));
  const [includeTarget, setIncludeTarget] = useState(Boolean(streak.target));

  const form = useForm({
    resolver: zodResolver(StreakEditFormSchema),
    defaultValues: {
      name: streak.name,
      rules: streak.rules ?? "",
      target: streak.target ? String(streak.target) : "1"
    }
  });

  async function submitEditStreak(edited: z.infer<typeof StreakEditFormSchema>) {
    try {
      await updateStreak.mutateAsync({
        id: streak.id,
        streak: {
          name: edited.name,

          rules: includeRules ? edited.rules : undefined,
          target: includeTarget ? Number(edited.target) : undefined
        }
      });
      toast.success(`Streak edited`);
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

            {/* Rules */}
            {!includeRules && (
              <Field orientation="horizontal">
                <FieldLabel>Add Rules</FieldLabel>
                <Checkbox checked={includeRules} onCheckedChange={() => setIncludeRules(true)} />
              </Field>
            )}
            {includeRules && (
              <div className="flex flex-col border rounded-md">
                <Field orientation="horizontal" className="p-2">
                  <FieldLabel>Remove Rules</FieldLabel>
                  <Checkbox checked={includeRules} onCheckedChange={() => setIncludeRules(false)} />
                </Field>
                <div className="border-b w-full" />
                <Controller
                  control={form.control}
                  name="rules"
                  render={({field, fieldState}) => (
                    <>
                      <Field data-invalid={fieldState.invalid} className="p-2">
                        <FieldLabel>Rules</FieldLabel>
                        <Textarea rows={4} placeholder="Do not eat candy" {...field} />
                      </Field>
                      {fieldState.error && <FieldError message={fieldState.error.message} />}
                    </>
                  )}
                />
              </div>
            )}

            {/* Target */}
            {!includeTarget && (
              <Field orientation="horizontal">
                <FieldLabel>Add Target</FieldLabel>
                <Checkbox checked={includeTarget} onCheckedChange={() => setIncludeTarget(true)} />
              </Field>
            )}
            {includeTarget && (
              <div className="flex flex-col border rounded-md">
                <Field orientation="horizontal" className="p-2">
                  <FieldLabel>Remove Target</FieldLabel>
                  <Checkbox checked={includeTarget} onCheckedChange={() => setIncludeTarget(false)} />
                </Field>
                <div className="border-b w-full" />
                <Controller
                  control={form.control}
                  name="target"
                  render={({field, fieldState}) => (
                    <>
                      <Field data-invalid={fieldState.invalid} className="p-2">
                        <FieldLabel>Target</FieldLabel>
                        <Input type="number" min={1} {...field} />
                      </Field>
                      {fieldState.error && <FieldError message={fieldState.error.message} />}
                    </>
                  )}
                />
              </div>
            )}

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
