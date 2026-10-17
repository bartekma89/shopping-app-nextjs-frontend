import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getProducts } from "@/features/products/queries";
import {
  type ProductStatus,
  productStatusSchema,
} from "@/features/products/schema";
import { Product } from "./product";

interface ProductsProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const EMPTY_MESSAGES = {
  available: "No available products.",
  sold: "No sold products yet.",
} satisfies Record<NonNullable<ProductStatus>, string>;

export const Products = async ({ searchParams }: ProductsProps) => {
  const params = await searchParams;
  const status = productStatusSchema.parse(params.status);

  const result = await getProducts(status);

  if (!result.ok) {
    return <p className="text-destructive">{result.message}</p>;
  }

  if (result.data.length === 0) {
    return (
      <div className="flex items-center gap-2">
        <p className="text-muted-foreground">
          {status ? EMPTY_MESSAGES[status] : "No products yet."}
        </p>
        <Link
          href="/"
          className={buttonVariants({
            variant: "secondary",
          })}
        >
          Show all products
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {result.data.map((product) => (
        <li key={product.id}>
          <Link
            href={`/products/${product.id}`}
            className="block rounded-xl transition-opacity outline-none hover:opacity-80 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Product product={product} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
