import { flattenError } from "zod";
import { productSchema } from "./schema";
import type { ParsedProduct } from "./types";

export const parseProduct = (formData: FormData): ParsedProduct => {
  const name = String(formData.get("name") ?? "");
  const description = String(formData.get("description") ?? "");
  const priceCents = String(formData.get("priceCents") ?? "");

  const values = {
    name,
    description,
    priceCents,
  };
  const validatedFields = productSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      state: {
        errors: flattenError(validatedFields.error).fieldErrors,
        message: null,
        values,
      },
    };
  }

  return {
    success: true,
    data: validatedFields.data,
    values,
  };
};
