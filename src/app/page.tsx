import { Suspense } from "react";
import { CreateProduct } from "@/features/products/components/create-product";
import { Products } from "@/features/products/components/products";
import { ProductsFilter } from "@/features/products/components/products-filter";
import { ProductsSkeleton } from "@/features/products/components/products-skeleton";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <div>
      <main className="p-6">
        <ProductsFilter />
        <Suspense fallback={<ProductsSkeleton />}>
          <Products searchParams={searchParams} />
        </Suspense>
        <CreateProduct />
      </main>
    </div>
  );
}
