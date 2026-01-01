import {TypographySmall} from "@/shadcn/typography/typography-small";

export function CupInMlHint() {
  return (
    <TypographySmall>
      <i>
        Give it in following format: <b className="text-green-500">125</b>. Values like{" "}
        <b className="text-destructive">1.25</b> or <b className="text-destructive">1,25</b> aren't allowed.
      </i>
    </TypographySmall>
  );
}
