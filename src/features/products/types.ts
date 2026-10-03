import type { ProductSchema } from "./schema";

export type Product = {
  name: string;
  description: string;
  price: number;
  userId: string;
};

export type ProductState = {
  errors: {
    name?: string[];
    description?: string[];
    price?: string[];
  };
  message?: string | null;
  values?: {
    name: string;
    description: string;
    price: string;
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
