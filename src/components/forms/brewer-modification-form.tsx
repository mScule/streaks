import z from "zod";

import {useState} from "react";

import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {toast} from "sonner";

import {Input} from "@/shadcn/ui/input";
import {Button} from "@/shadcn/ui/button";
import {Field, FieldGroup, FieldLabel} from "@/shadcn/ui/field";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn/ui/dialog";

import type {WithId} from "@/types/with-id";
import type {Brewer} from "@/types/brewer";
import {useUpdateBrewer} from "@/react-query/hooks/brewer/use-update-brewer";
import {NameSchema} from "@/form-value-schemas/name-schema";
import {PositiveIntegerSchema} from "@/form-value-schemas/positive-integer-schema";
import {PenIcon} from "lucide-react";
import { CupInMlHint } from "../hints/cup-in-ml-hint";
import { FieldError } from "../field-error";

const FormSchema = z.object({
  name: NameSchema.optional(),
  cupInMillilitres: PositiveIntegerSchema.optional()
});

type Props = {
  brewer: WithId<Brewer>;
};

export function BrewerModificationForm({brewer}: Props) {
  const updateBrewer = useUpdateBrewer();

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      cupInMillilitres: ""
    }
  });

  async function submitUpdateBrewer(data: z.infer<typeof FormSchema>) {
    try {
      await updateBrewer.mutateAsync({
        id: brewer.id,
        brewer: {
          ...(data.name && {name: data.name}),
          ...(data.cupInMillilitres && {cupInMillilitres: Number(data.cupInMillilitres)})
        }
      });
      toast.success(`Brewer ${data.name ?? brewer.name} updated`);
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
          Update <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update {brewer.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(submitUpdateBrewer)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({field, fieldState}) => (
                <>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Name</FieldLabel>
                    <Input placeholder={brewer.name} {...field} />
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
                    <Input placeholder={brewer.cupInMillilitres + ""} {...field} />
                  </Field>
                  {fieldState.error && <FieldError message={fieldState.error.message} />}
                </>
              )}
            />
            <Button variant="outline" type="submit">
              <span>Update</span>
              <PenIcon />
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
