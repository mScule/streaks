import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCreateCoffee} from "@/react-query/hooks/coffee/use-create-coffee";
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
import {CoffeeInGramsHint} from "../hints/coffee-in-grams-hint";

const CoffeeCreationFormSchema = z.object({
  name: NameSchema,
  cupInMillilitres: PositiveIntegerSchema,
  coffeeInGrams: PositiveIntegerSchema
});

export function CoffeeCreationForm() {
  const createCoffee = useCreateCoffee();

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(CoffeeCreationFormSchema),
    defaultValues: {
      name: "",
      cupInMillilitres: "",
      coffeeInGrams: ""
    }
  });

  async function submitCreateCoffee(coffee: z.infer<typeof CoffeeCreationFormSchema>) {
    try {
      const created = await createCoffee.mutateAsync({
        coffee: {
          name: coffee.name,
          cupInMillilitres: Number(coffee.cupInMillilitres),
          coffeeInGrams: Number(coffee.coffeeInGrams)
        }
      });
      toast.success(`Coffee ${created.name} added`);
      form.reset();
      setIsOpen(false);
    } catch {
      toast.error(`Error creating coffee`);
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
          <DialogTitle>Add new coffee</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(submitCreateCoffee)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({field, fieldState}) => (
                <>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Name</FieldLabel>
                    <Input placeholder="Acme Coffee Dark Roast" {...field} />
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
            <Controller
              control={form.control}
              name="coffeeInGrams"
              render={({field, fieldState}) => (
                <>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Coffee in grams per cup</FieldLabel>
                    <CoffeeInGramsHint />
                    <Input placeholder="For example 7g is 7" {...field} />
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
