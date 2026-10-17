"use client";

import { useActionState } from "react";
import { checkout } from "../actions";
import { CheckoutButton } from "./checkout-button";

interface CheckoutProps {
  productName: string;
  productId: number;
  disabled: boolean;
}

export const Checkout = ({
  productName,
  productId,
  disabled,
}: CheckoutProps) => {
  const checkoutAction = checkout.bind(null, productId);
  const [state, formAction] = useActionState(checkoutAction, null);

  return (
    <form action={formAction}>
      <CheckoutButton productName={productName} disabled={disabled} />
      {state?.message && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {state.message}
        </p>
      )}
    </form>
  );
};
