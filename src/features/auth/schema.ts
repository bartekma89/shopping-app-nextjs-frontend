import { z } from "zod";

export const userSchema = z.object({
  email: z.email({
    error: "Enter a valid email",
  }),
  password: z.string().min(1, {
    error: "Password required",
  }),
});
