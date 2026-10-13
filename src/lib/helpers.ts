export const formatMoney = (cents: number): string =>
  new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(
    cents / 100,
  );

export const mapErrorsToFields = (errors: string[] | undefined) =>
  errors?.map((error) => ({ message: error })) || [];
