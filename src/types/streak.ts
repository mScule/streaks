import { NameSchema } from "@/form-value-schemas/name-schema";
import z from "zod";

export const StreakSchema = z.object({
  name: NameSchema,
  resets: z.array(z.iso.date())
});

export type Streak = z.infer<typeof StreakSchema>;
