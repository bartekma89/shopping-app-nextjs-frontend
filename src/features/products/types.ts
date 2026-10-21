import type { FieldErrors } from "@/lib/api/types";
import type { ProductSchema } from "./schema";

export type Product = {
  id: number;
  name: string;
  description: string;
  priceCents: number;
  userId: number;
  imageKey: string | null;
  sold: boolean;
};

export type ProductState = {
  errors: {
    name?: string[];
    description?: string[];
    priceCents?: string[];
    image?: string[];
  };
  message?: string | null;
  values?: {
    name: string;
    description: string;
    priceCents: string;
  };
  success?: boolean;
};

export type ImageState = {
  errors: FieldErrors;
  message: string | null;
  success: boolean;
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

export type ProductSoldEvent = {
  productId: number;
  sellerId: number;
};

export type ProductCreatedEvent = {
  product: Product;
};

export type ProductPurchasedEvent = {
  recipientId: number;
  productId: number;
  name: string;
  priceCents: number;
};
