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
import {FieldError} from "../field-error";
import { isoDateStringFromDate } from "@/functions/iso-date-string-from-date";

const StreakCreationFormSchema = z.object({
  name: NameSchema,
});

export function StreakCreationForm() {
  const createStreak = useCreateStreak();

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(StreakCreationFormSchema),
    defaultValues: {
      name: ""
    }
  });

  async function submitCreateBrewer(streak: z.infer<typeof StreakCreationFormSchema>) {
    try {
      const created = await createStreak.mutateAsync({
        streak: {
          name: streak.name,
          resets: [isoDateStringFromDate(new Date())]
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
        <form onSubmit={form.handleSubmit(submitCreateBrewer)}>
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
