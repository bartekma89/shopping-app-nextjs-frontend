import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(1, {
    error: "Name required",
  }),
  description: z.string().trim().min(1, {
    error: "Description required",
  }),
  price: z
    .string()
    .trim()
    .min(1, {
      error: "Price required",
    })
    .transform(Number)
    .pipe(
      z
        .number({
          error: "Price must be a number",
        })
        .positive({
          error: "Price must be a positive number",
        }),
    ),
});

export type ProductSchema = z.infer<typeof productSchema>;
