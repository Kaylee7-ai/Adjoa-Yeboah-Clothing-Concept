export type Currency = "GHS" | "USD" | "GBP" | "EUR";
const rates: Record<Currency,number> = {GHS:1,USD:0.065,GBP:0.052,EUR:0.060};
// Indicative display conversions only. Replace with live rates before launch.
export function formatPrice(amountGhs:number,currency:Currency="GHS"){return new Intl.NumberFormat("en",{style:"currency",currency,maximumFractionDigits:2}).format(amountGhs*rates[currency]);}
