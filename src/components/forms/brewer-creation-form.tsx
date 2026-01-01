import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCreateBrewer} from "@/react-query/hooks/brewer/use-create-brewer";
import {toast} from "sonner";
import {Field, FieldGroup, FieldLabel} from "@/shadcn/ui/field";
import {Input} from "@/shadcn/ui/input";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn/ui/dialog";
import {Button} from "@/shadcn/ui/button";
import z from "zod";
import {useState} from "react";
import {PlusIcon} from "lucide-react";
import {PositiveIntegerSchema} from "@/form-value-schemas/positive-integer-schema";
import {NameSchema} from "@/form-value-schemas/name-schema";
import {CupInMlHint} from "../hints/cup-in-ml-hint";
import {FieldError} from "../field-error";

const BrewerCreationFormSchema = z.object({
  name: NameSchema,
  cupInMillilitres: PositiveIntegerSchema
});

export function BrewerCreationForm() {
  const createBrewer = useCreateBrewer();

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(BrewerCreationFormSchema),
    defaultValues: {
      name: "",
      cupInMillilitres: ""
    }
  });

  async function submitCreateBrewer(brewer: z.infer<typeof BrewerCreationFormSchema>) {
    try {
      const created = await createBrewer.mutateAsync({
        brewer: {
          name: brewer.name,
          cupInMillilitres: Number(brewer.cupInMillilitres)
        }
      });
      toast.success(`Brewer ${created.name} added`);
      form.reset();
      setIsOpen(false);
    } catch {
      toast.error(`Error creating brewer`);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => setIsOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <span>Add new</span>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new brewer</DialogTitle>
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
                    <Input placeholder="Acme Coffee Maker" {...field} />
                  </Field>
                  {fieldState.error && <FieldError message={fieldState.error.message} />}
                </>
              )}
            />
            <Controller
              control={form.control}
              name="cupInMillilitres"
              render={({field, fieldState}) => (
                <>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Cup size in millilitres</FieldLabel>
                    <CupInMlHint />
                    <Input placeholder="For example 1.25ml is 125" {...field} />
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
