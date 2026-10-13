export type CheckoutResponse = {
  url: string;
};

type CheckoutState = { message: string } | null;
export type CheckoutAction = (
  productId: number,
  prevState: CheckoutState,
) => Promise<CheckoutState>;
