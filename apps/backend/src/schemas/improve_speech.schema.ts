import {z} from "zod";

export const improveSpeechSchema = z.object({
  speech: z.array(z.string()),
  emotion: z.array(z.string())
});