import { formatCurrencyMillion } from "./formatCurrencyMillion";
import { getFromToValue } from "./getFromToValue";

export const formatCurrency = (value: number): string => {
  const price = new Intl.NumberFormat("ru-RU", {
    // style: "currency",
    currency: "RUB",
  }).format(value);
  return `${price} руб.`
};

export const formatPriceRange = (value: number) => {
  const range = getFromToValue(value);
  const from = formatCurrencyMillion(range[0]);
  const to = formatCurrencyMillion(range[1]);

  return `${from} - ${to} млн. руб.`;
};
