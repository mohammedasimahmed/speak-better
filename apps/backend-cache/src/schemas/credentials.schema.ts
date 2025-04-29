import { z } from "zod";

export const credentialsSchema = z.object({
  username: z.string(),
  email: z.string().email(),
});
