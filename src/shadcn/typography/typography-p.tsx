import type { PropsWithChildren } from "react";

export function TypographyP({ children }: PropsWithChildren) {
  return <p className="leading-7">{children}</p>;
}
