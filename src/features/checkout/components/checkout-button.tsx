"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface CheckoutButtonProps {
  productName: string;
  disabled: boolean;
}

export const CheckoutButton = ({
  productName,
  disabled,
}: CheckoutButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={disabled || pending}
      type="submit"
      size="lg"
      aria-label={`Buy product ${productName}`}
      className="cursor-pointer"
    >
      Checkout
    </Button>
  );
};
