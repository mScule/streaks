import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCreateStreak} from "@/react-query/hooks/streak/use-create-streak";
import {toast} from "sonner";
import {Field, FieldGroup, FieldLabel} from "@/shadcn/ui/field";
import {Input} from "@/shadcn/ui/input";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn/ui/dialog";
import {Button} from "@/shadcn/ui/button";
import z from "zod";
import {useState} from "react";
import {PlusIcon} from "lucide-react";
import {NameSchema} from "@/form-value-schemas/name-schema";
import {FieldError} from "../components/field-error";
import {isoDateStringFromDate} from "@/functions/iso-date-string-from-date";
import {Checkbox} from "@/shadcn/ui/checkbox";
import {Textarea} from "@/shadcn/ui/textarea";

const StreakCreationFormSchema = z.object({
  name: NameSchema,
  rules: z.string(),
  target: z.string()
});

export function StreakCreationForm() {
  const createStreak = useCreateStreak();

  const [isOpen, setIsOpen] = useState(false);

  const [includeRules, setIncludeRules] = useState(false);
  const [includeTarget, setIncludeTarget] = useState(false);

  const form = useForm({
    resolver: zodResolver(StreakCreationFormSchema),
    defaultValues: {
      name: "",
      rules: "",
      target: "1"
    }
  });

  async function submitCreateStreak(streak: z.infer<typeof StreakCreationFormSchema>) {
    try {
      const created = await createStreak.mutateAsync({
        streak: {
          name: streak.name,
          resets: [isoDateStringFromDate(new Date())],

          ...(includeRules && { rules: streak.rules }),
          ...(includeTarget && { target: Number(streak.target) }),
        }
      });
      toast.success(`Streak "${created.name}" added`);
      form.reset();
      setIsOpen(false);
    } catch {
      toast.error(`Error creating streak`);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => setIsOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <span>Add a new streak</span>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new streak</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(submitCreateStreak)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({field, fieldState}) => (
                <>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Name</FieldLabel>
                    <Input placeholder="No candy challenge" {...field} />
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
              <span>Add new</span>
              <PlusIcon />
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
