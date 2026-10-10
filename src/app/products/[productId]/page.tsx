import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/features/products/queries";
import { env } from "@/lib/env";
import { formatMoney } from "@/lib/helpers";

export default async function ProductPage({
  params,
}: PageProps<"/products/[productId]">) {
  const { productId } = await params;
  const result = await getProduct(productId);

  if (!result.ok && (result.status === 400 || result.status === 404)) {
    notFound();
  }

  if (!result.ok) {
    return <p className="p-6 text-destructive">{result.message}</p>;
  }

  const product = result.data;

  return (
    <main className="mx-auto max-w-5xl p-6">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to products
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {product.imageKey ? (
          <Image
            src={`${env.API_URL}/products/images/${product.imageKey}`}
            alt={product.name}
            width={500}
            height={500}
            sizes="(min-width: 1024px) 472px, (min-width: 768px) 50vw, 100vw"
            preload
            className="aspect-square w-full rounded-xl object-cover"
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-muted text-muted-foreground">
            No image
          </div>
        )}

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">
            {formatMoney(product.priceCents)}
          </p>
          <p className="whitespace-pre-line text-muted-foreground">
            {product.description}
          </p>
        </div>
      </div>
    </main>
  );
}
