import { get } from "@/lib/api/client";
import type { Product } from "./types";

export const getProducts = () => {
  return get<Product[]>("products", ["products"]);
};

export const getProduct = (productId: string) => {
  return get<Product>(`products/${productId}`, [
    "products",
    `products-${productId}`,
  ]);
};
