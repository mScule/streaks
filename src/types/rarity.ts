import z from "zod";

export const RaritySchema = z.enum([
  "common",
  "uncommon",
  "rare",
  "epic",
  "legendary",
  "mythic"
]);

export type Rarity = z.infer<typeof RaritySchema>;
