"use server";

import { redirect } from "next/navigation";
import { post } from "@/lib/api/client";
import type { CheckoutAction, CheckoutResponse } from "./types";


export const checkout: CheckoutAction = async (productId, _prevState) => {
  const session = await post<CheckoutResponse>("checkout/session", {
    productId,
  });

  if (!session.ok) {
    return {
      message: session.message,
    };
  }

  redirect(session.data.url);
};
