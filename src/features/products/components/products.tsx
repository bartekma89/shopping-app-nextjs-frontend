import { getProducts } from "@/features/products/queries";
import { Product } from "./product";

export const Products = async () => {
  const result = await getProducts();

  if (!result.ok) {
    return <p className="text-destructive">{result.message}</p>;
  }

  if (result.data.length === 0) {
    return <p className="text-muted-foreground">No products yet.</p>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {result.data.map((product) => (
        <li key={product.id}>
          <Product product={product} />
        </li>
      ))}
    </ul>
  );
};
