import { getProducts } from "@/features/products/queries";
import { formatMoney } from "@/lib/helpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const Products = async () => {
  const result = await getProducts();

  if (!result.ok) {
    return <p className="text-destructive">{result.message}</p>;
  }

  if (result.data.length === 0) {
    return <p className="text-muted-foreground">No products yet.</p>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {result.data.map((product) => (
        <li key={product.id}>
          <Card>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{formatMoney(product.priceCents)}</p>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
};
