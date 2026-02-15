import z from "zod";

export const RulesSchema = z.string().min(3);

export type Rules = z.infer<typeof RulesSchema>;
