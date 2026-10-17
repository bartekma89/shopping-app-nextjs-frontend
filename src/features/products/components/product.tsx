import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product as ProductType } from "@/features/products/types";
import { env } from "@/lib/env";
import { formatMoney } from "@/lib/helpers";

interface ProductProps {
  product: ProductType;
}

export const Product = ({ product }: ProductProps) => (
  <Card>
    {product.imageKey && (
      <Image
        src={`${env.API_URL}/products/images/${product.imageKey}`}
        alt={product.name}
        width={500}
        height={500}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="aspect-square w-full object-cover"
      />
    )}
    <CardHeader>
      {product.sold && <Badge variant="destructive">Sold</Badge>}
      <CardTitle>{product.name}</CardTitle>
      <CardDescription>{product.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="font-semibold">{formatMoney(product.priceCents)}</p>
    </CardContent>
  </Card>
);
