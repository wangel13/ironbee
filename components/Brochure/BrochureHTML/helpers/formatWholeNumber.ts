export const formatWholeNumber = (value: number): string => {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(
    value
  );
};
