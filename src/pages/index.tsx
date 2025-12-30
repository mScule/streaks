import {BrewerList} from "@/components/lists/brewer-list";
import {CoffeeList} from "@/components/lists/coffee-list";
import {BrewCalculator} from "@/components/brew-calculator";
import {BrewerCreationForm} from "@/components/forms/brewer-creation-form";
import {CoffeeCreationForm} from "@/components/forms/coffee-creation-form";
import {Logo} from "@/components/logo";
import {TypographyH2} from "@/shadcn/typography/typography-h2";
import {Tabs, TabsList, TabsTrigger} from "@/shadcn/ui/tabs";
import {TabsContent} from "@radix-ui/react-tabs";

export function Index() {
  return (
    <main className="flex flex-col items-center gap-5 py-4">
      <Logo />
      <Tabs defaultValue="main" className="flex flex-col items-center gap-5">
        <TabsList>
          <TabsTrigger value="main">Brew</TabsTrigger>
          <TabsTrigger value="brewers">Brewers</TabsTrigger>
          <TabsTrigger value="coffee">Coffee</TabsTrigger>
        </TabsList>

        <TabsContent value="main" className="flex flex-col gap-3 px-2 w-screen max-w-2xl">
          <div className="flex flex-row gap-5 justify-between w-full">
            <TypographyH2>Brew</TypographyH2>
          </div>
          <BrewCalculator />
        </TabsContent>

        <TabsContent value="brewers" className="flex flex-col gap-3 px-2 w-screen max-w-2xl">
          <div className="flex flex-row gap-5 justify-between w-full">
            <TypographyH2>Brewers</TypographyH2>
            <BrewerCreationForm />
          </div>
          <BrewerList />
        </TabsContent>

        <TabsContent value="coffee" className="flex flex-col gap-3 px-2 w-screen max-w-2xl">
          <div className="flex flex-row gap-5 justify-between w-full">
            <TypographyH2>Coffee</TypographyH2>
            <CoffeeCreationForm />
          </div>
          <CoffeeList />
        </TabsContent>
      </Tabs>
    </main>
  );
}
