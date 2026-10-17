import { get } from "@/lib/api/client";
import type { ProductStatus } from "./schema";
import type { Product } from "./types";

export const getProducts = (status?: ProductStatus) => {
  const path = status ? `products?status=${status}` : "products";
  return get<Product[]>(path, ["products", `products-${status ?? "all"}`]);
};

export const getProduct = (productId: string) => {
  return get<Product>(`products/${productId}`, [
    "products",
    `products-${productId}`,
  ]);
};
