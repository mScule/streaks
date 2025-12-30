import {useQueryAllBrewers} from "@/react-query/hooks/brewer/use-query-all-brewers";
import {TypographyLead} from "@/shadcn/typography/typography-lead";
import {TypographyP} from "@/shadcn/typography/typography-p";
import {Card, CardContent, CardHeader} from "@/shadcn/ui/card";
import {CoffeeIcon} from "lucide-react";
import {BrewerModificationForm} from "@/components/forms/brewer-modification-form";
import {BrewerDeletionForm} from "@/components/forms/brewer-deletion-form";

export function BrewerList() {
  const brewers = useQueryAllBrewers();

  if (!brewers.data) {
    return <TypographyLead>No brewers</TypographyLead>;
  }

  return (
    <div className="flex flex-col gap-2">
      {brewers.data.map(brewer => (
        <Card key={brewer.id}>
          <CardHeader>{brewer.name}</CardHeader>
          <CardContent>
            <div className="flex flex-row justify-between gap-3 items-center">
              <div className="flex flex-row gap-1 items-center">
                <TypographyP>{brewer.cupInMillilitres}ml</TypographyP>
                <CoffeeIcon size="16px" />
              </div>
              <div className="flex flex-row gap-3">
                <BrewerModificationForm brewer={brewer} />
                <BrewerDeletionForm brewer={brewer} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
