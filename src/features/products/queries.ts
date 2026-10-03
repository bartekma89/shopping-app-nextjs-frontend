import { get } from "@/lib/api/client";
import type { Product } from "./types";

export const getProducts = () => {
  return get<Product[]>("products", ["products"]);
};
