export const formatMoney = (cents: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100,
  );

export const mapErrorsToFields = (errors: string[] | undefined) =>
  errors?.map((error) => ({ message: error })) || [];
