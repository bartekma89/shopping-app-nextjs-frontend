"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type ProductStatus,
  productStatusEnum,
  productStatusSchema,
} from "@/features/products/schema";

const STATUS_LABELS = {
  available: "Available",
  sold: "Sold",
} satisfies Record<NonNullable<ProductStatus>, string>;

const OPTIONS = [
  { value: null, label: "All" },
  ...productStatusEnum.options.map((value) => ({
    value,
    label: STATUS_LABELS[value],
  })),
];

export const ProductsFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const status = productStatusSchema.parse(searchParams.get("status")) ?? null;

  const handleChange = (value: ProductStatus | null) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    const query = params.toString();

    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname);
    });
  };

  return (
    <div className="mb-4 flex items-center gap-2">
      <Label htmlFor="status-filter">Status</Label>
      <Select items={OPTIONS} onValueChange={handleChange} value={status}>
        <SelectTrigger className="w-full max-w-48" id="status-filter">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {OPTIONS.map((item) => (
            <SelectItem key={item.label} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isPending && (
        <span className="text-sm text-muted-foreground" aria-live="polite">
          Loading…
        </span>
      )}
    </div>
  );
};
