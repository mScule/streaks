import {NameSchema} from "@/form-value-schemas/name-schema";
import {RulesSchema} from "@/form-value-schemas/rules-schema";
import {TargetSchema} from "@/form-value-schemas/target-schema";

import z from "zod";

export const StreakSchema = z.object({
  name: NameSchema,
  rules: RulesSchema.optional(),
  target: TargetSchema.optional(),
  resets: z.array(z.iso.date())
});

export type Streak = z.infer<typeof StreakSchema>;
