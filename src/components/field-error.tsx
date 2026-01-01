import {Alert, AlertDescription, AlertTitle} from "@/shadcn/ui/alert";

type Props = {
  message?: string;
};

export function FieldError({message}: Props) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Incorrect Input</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
