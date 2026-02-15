import z from "zod";

export const TargetSchema = z.int().min(1);

export type Target = z.infer<typeof TargetSchema>;
