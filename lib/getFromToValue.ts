export function getFromToValue(value: number): [number, number] {
  const delta = value * 0.11;
  return [value - delta, value + delta];
}
