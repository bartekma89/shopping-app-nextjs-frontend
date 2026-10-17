import { z } from "zod";
import { MAX_IMAGE_SIZE } from "@/lib/constants";

export const productSchema = z.object({
  name: z.string().trim().min(1, {
    error: "Name required",
  }),
  description: z.string().trim().min(1, {
    error: "Description required",
  }),
  priceCents: z
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
        })
        .transform((price) => Math.round(price * 100)),
    ),
  image: z.preprocess(
    (file) => (file instanceof File && file.size === 0 ? undefined : file),
    z
      .file()
      .max(MAX_IMAGE_SIZE, { error: "Image must be at most 10 MB" })
      .mime(["image/jpeg", "image/png", "image/webp"], {
        error: "Only JPEG, PNG or WebP",
      })
      .optional(),
  ),
});

export type ProductSchema = z.infer<typeof productSchema>;

export const productStatusEnum = z.enum(["available", "sold"]);

export const productStatusSchema = productStatusEnum
  .optional()
  .catch(undefined);

export type ProductStatus = z.infer<typeof productStatusSchema>;
