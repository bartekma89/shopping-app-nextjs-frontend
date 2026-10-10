"use server";

import { updateTag } from "next/cache";
import { post } from "@/lib/api/client";
import { parseProduct } from "./helpers";
import type { ImageState, Product, ProductState } from "./types";

export async function createProduct(
  _prevState: ProductState,
  formData: FormData,
): Promise<ProductState> {
  const product = parseProduct(formData);

  if (!product.success) {
    return product.state;
  }

  const { image, ...rest } = product.data;

  const result = await post<Product>("products", rest);

  if (!result.ok) {
    return {
      errors: result.fieldErrors,
      message: result.message,
      values: product.values,
    };
  }

  let imageResult: ImageState | undefined;
  if (image) {
    imageResult = await uploadProductImage(result.data.id, image);
  }

  updateTag("products");

  return {
    errors: {},
    message: imageResult && !imageResult.success ? imageResult.message : null,
    success: true,
  };
}

async function uploadProductImage(
  productId: number,
  file: File,
): Promise<ImageState> {
  const formData = new FormData();
  formData.append("image", file);

  const result = await post<void>(`products/${productId}/image`, formData);

  if (!result.ok) {
    return {
      errors: result.fieldErrors,
      message: result.message,
      success: false,
    };
  }

  return {
    errors: {},
    message: null,
    success: true,
  };
}
