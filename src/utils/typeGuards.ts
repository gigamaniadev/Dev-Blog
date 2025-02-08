export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

export function isValidObject<T extends object>(
  value: unknown,
  requiredProps: (keyof T)[]
): value is T {
  if (!value || typeof value !== "object") return false;
  return requiredProps.every((prop) => prop in value);
}
