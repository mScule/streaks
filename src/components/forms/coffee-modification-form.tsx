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
import {NameSchema} from "@/form-value-schemas/name-schema";
import {PositiveIntegerSchema} from "@/form-value-schemas/positive-integer-schema";
import {PenIcon} from "lucide-react";
import {useUpdateCoffee} from "@/react-query/hooks/coffee/use-update-coffee";
import type {Coffee} from "@/types/coffee";
import {FieldError} from "../field-error";
import {CupInMlHint} from "../hints/cup-in-ml-hint";
import {CoffeeInGramsHint} from "../hints/coffee-in-grams-hint";

const FormSchema = z.object({
  name: NameSchema.optional(),
  cupInMillilitres: PositiveIntegerSchema.optional(),
  coffeeInGrams: PositiveIntegerSchema.optional()
});

type Props = {
  coffee: WithId<Coffee>;
};

export function CoffeeModificationForm({coffee}: Props) {
  const updateCoffee = useUpdateCoffee();

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      cupInMillilitres: "",
      coffeeInGrams: ""
    }
  });

  async function submitUpdateCoffee(data: z.infer<typeof FormSchema>) {
    try {
      await updateCoffee.mutateAsync({
        id: coffee.id,
        coffee: {
          ...(data.name && {name: data.name}),
          ...(data.cupInMillilitres && {cupInMillilitres: Number(data.cupInMillilitres)}),
          ...(data.coffeeInGrams && {coffeeInGrams: Number(data.coffeeInGrams)})
        }
      });
      toast.success(`Coffee ${data.name ?? coffee.name} updated`);
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
          <DialogTitle>Update {coffee.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(submitUpdateCoffee)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({field, fieldState}) => (
                <>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Name</FieldLabel>
                    <Input placeholder={coffee.name} {...field} />
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
                    <Input placeholder={coffee.cupInMillilitres + ""} {...field} />
                  </Field>
                  {fieldState.error && <FieldError message={fieldState.error.message} />}
                </>
              )}
            />
            <Controller
              control={form.control}
              name="coffeeInGrams"
              render={({field, fieldState}) => (
                <>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Coffee in grams per cup</FieldLabel>
                    <CoffeeInGramsHint />
                    <Input placeholder={coffee.coffeeInGrams + ""} {...field} />
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
