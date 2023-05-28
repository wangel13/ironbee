export const formatCurrencyMillion = (value: number): string => {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 }).format(
    value / 1000000
  );
};
