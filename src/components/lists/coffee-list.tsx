import {useQueryAllCoffee} from "@/react-query/hooks/coffee/use-query-all-coffee";
import {TypographyLead} from "@/shadcn/typography/typography-lead";
import {TypographyP} from "@/shadcn/typography/typography-p";
import {Card, CardContent, CardHeader} from "@/shadcn/ui/card";
import {CoffeeModificationForm} from "@/components/forms/coffee-modification-form";
import {CoffeeDeletionForm} from "@/components/forms/coffee-deletion-form";

export function CoffeeList() {
  const coffee = useQueryAllCoffee();

  if (!coffee.data) {
    return <TypographyLead>No coffee</TypographyLead>;
  }

  return (
    <div className="flex flex-col gap-2">
      {coffee.data.map(coffee => (
        <Card key={coffee.id}>
          <CardHeader>{coffee.name}</CardHeader>
          <CardContent>
            <div className="flex flex-row justify-between gap-3 items-center">
              <TypographyP>
                {coffee.coffeeInGrams}g / {coffee.cupInMillilitres}ml
              </TypographyP>
              <div className="flex flex-row gap-3">
                <CoffeeModificationForm coffee={coffee} />
                <CoffeeDeletionForm coffee={coffee} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
