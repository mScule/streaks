import {TypographySmall} from "@/shadcn/typography/typography-small";

export function CoffeeInGramsHint() {
  return (
    <TypographySmall>
      <i>
        Give it in following format: <b className="text-green-500">7</b>. Values like{" "}
        <b className="text-destructive">7.5</b> or <b className="text-destructive">7,5</b> aren't allowed.
      </i>
    </TypographySmall>
  );
}
