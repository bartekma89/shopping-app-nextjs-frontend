import type { ProductSchema } from "./schema";

export type Product = {
  id: number;
  name: string;
  description: string;
  priceCents: number;
  userId: number;
};

export type ProductState = {
  errors: {
    name?: string[];
    description?: string[];
    priceCents?: string[];
  };
  message?: string | null;
  values?: {
    name: string;
    description: string;
    priceCents: string;
  };
  success?: boolean;
};

export type ParsedProduct =
  | {
      success: true;
      data: ProductSchema;
      values: ProductState["values"];
    }
  | {
      success: false;
      state: ProductState;
    };
