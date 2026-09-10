const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

/** 4.5 -> "£4.50". Formatting lives here, never in a component. */
export function formatGBP(amount: number): string {
  return gbp.format(amount);
}
