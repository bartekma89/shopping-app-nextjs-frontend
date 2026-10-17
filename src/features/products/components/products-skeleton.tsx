import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_COUNT = 8;

export const ProductsSkeleton = () => (
  <ul
    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    aria-busy="true"
    aria-label="Loading products"
  >
    {Array.from({ length: SKELETON_COUNT }, (_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder list
      <li key={i}>
        <Card>
          <Skeleton className="aspect-square w-full rounded-none" />
          <CardHeader className="gap-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-5 w-20" />
          </CardContent>
        </Card>
      </li>
    ))}
  </ul>
);
