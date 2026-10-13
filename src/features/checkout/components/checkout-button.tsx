"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface CheckoutButtonProps {
  productName: string;
}

export const CheckoutButton = ({ productName }: CheckoutButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      size="lg"
      aria-label={`Buy product ${productName}`}
    >
      Checkout
    </Button>
  );
};
