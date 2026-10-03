"use server";

import { updateTag } from "next/cache";
import { post } from "@/lib/api/client";
import { parseProduct } from "./helpers";
import type { Product, ProductState } from "./types";

export async function createProduct(
  _prevState: ProductState,
  formData: FormData,
): Promise<ProductState> {
  const product = parseProduct(formData);

  if (!product.success) {
    return product.state;
  }

  const result = await post<Product>("products", product.data);

  if (!result.ok) {
    return {
      errors: result.fieldErrors,
      message: result.message,
      values: product.values,
    };
  }

  updateTag("products");

  return {
    errors: {},
    message: null,
    success: true,
  };
}
