"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/components/ui/toast";
import { logout } from "@/features/auth/actions";
import { formatMoney } from "@/lib/helpers";
import type { ProductPurchasedEvent } from "../types";

export const ProductEventsListener = () => {
  const router = useRouter();

  useEffect(() => {
    const es = new EventSource("/api/products/events");

    let hasConnected = false;

    const refresh = () => router.refresh();

    const onPurchased = (event: MessageEvent<string>) => {
      const data: ProductPurchasedEvent = JSON.parse(event.data);

      toast.add({
        type: "success",
        title: "Your product has been sold",
        description: `${data.name} - ${formatMoney(data.priceCents)}`,
      });
    };

    es.addEventListener("product.sold", refresh);
    es.addEventListener("product.created", refresh);
    es.addEventListener("product.purchased", onPurchased);

    es.onopen = () => {
      if (hasConnected) {
        refresh();
      }
      hasConnected = true;
    };

    es.onerror = () => {
      if (es.readyState === EventSource.CLOSED) {
        logout();
      }
    };

    return () => es.close();
  }, [router]);

  return null;
};
