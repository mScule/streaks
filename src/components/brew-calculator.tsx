import {useQueryAllBrewers} from "@/react-query/hooks/brewer/use-query-all-brewers";
import {useQueryAllCoffee} from "@/react-query/hooks/coffee/use-query-all-coffee";
import {TypographyP} from "@/shadcn/typography/typography-p";
import {Button} from "@/shadcn/ui/button";
import {Card, CardContent} from "@/shadcn/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/shadcn/ui/select";
import {Separator} from "@/shadcn/ui/separator";
import {type Nullable} from "@/types/nullable";
import {Minus, Plus} from "lucide-react";
import {useMemo, useState} from "react";

export function BrewCalculator() {
  const brewers = useQueryAllBrewers();
  const coffee = useQueryAllCoffee();

  const [cups, setCups] = useState(0);

  const [selectedBrewerId, setSelectedBrewerId] = useState<Nullable<string>>(null);
  const [selectedCoffeeId, setSelectedCoffeeId] = useState<Nullable<string>>(null);

  const selectedBrewer = useMemo(() => {
    if (!brewers.data) {
      return null;
    }

    const selected = brewers.data.find(brewer => brewer.id === selectedBrewerId);

    if (!selected) {
      return null;
    }

    return selected;
  }, [brewers, selectedBrewerId]);

  const selectedCoffee = useMemo(() => {
    if (!coffee.data) {
      return null;
    }

    const selected = coffee.data.find(coffee => coffee.id === selectedCoffeeId);

    if (!selected) {
      return null;
    }

    return selected;
  }, [coffee, selectedCoffeeId]);

  const totalWater = useMemo<Nullable<number>>(() => {
    if (!selectedBrewer) {
      return null;
    }

    return selectedBrewer.cupInMillilitres * cups;
  }, [selectedBrewer, cups]);

  const gramsPerMl = useMemo<Nullable<number>>(() => {
    if (!selectedCoffee) {
      return null;
    }

    return selectedCoffee.coffeeInGrams / (selectedCoffee.cupInMillilitres / 100);
  }, [selectedCoffee]);

  const totalBeans = useMemo<Nullable<number>>(() => {
    if (!totalWater) {
      return null;
    }
    if (!gramsPerMl) {
      return null;
    }

    return gramsPerMl * (totalWater / 100);
  }, [totalWater, gramsPerMl]);

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardContent className="flex flex-col md:flex-row items-left md:items-center justify-between gap-3">
          {brewers.data && (
            <div className="flex flex-row items-center justify-between gap-3">
              <TypographyP>Select a brewer</TypographyP>
              <Select onValueChange={id => setSelectedBrewerId(id)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a brewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Bewers</SelectLabel>
                    {brewers.data.map(brewer => (
                      <SelectItem key={brewer.id} value={brewer.id}>
                        {brewer.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          {coffee.data && (
            <div className="flex flex-row items-center justify-between gap-3">
              <TypographyP>Select coffee</TypographyP>
              <Select onValueChange={id => setSelectedCoffeeId(id)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select coffee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Coffee</SelectLabel>
                    {coffee.data.map(coffee => (
                      <SelectItem key={coffee.id} value={coffee.id}>
                        {coffee.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>
      {selectedBrewer && selectedCoffee && (
        <Card>
          <CardContent className="flex flex-row justify-center items-center gap-3">
            <TypographyP>Select how many cups you would like to make?</TypographyP>

            <Button variant="outline" onClick={() => setCups(cups => cups - 1)}>
              <Minus />
            </Button>
            <TypographyP>{cups}</TypographyP>
            <Button variant="outline" onClick={() => setCups(cups => cups + 1)}>
              <Plus />
            </Button>
          </CardContent>
        </Card>
      )}

      {totalWater !== null && totalBeans !== null && (
        <>
          <Separator />
          <Card className="border-amber-500">
            <CardContent className="flex flex-row justify-evenly">
              <TypographyP>
                <span className="text-xl text-amber-500">
                  Water: <b>{totalWater}ml</b>
                </span>
              </TypographyP>

              <TypographyP>
                <span className="text-xl text-amber-500">
                  Beans: <b>{Math.round(totalBeans)}g</b>
                </span>
              </TypographyP>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
