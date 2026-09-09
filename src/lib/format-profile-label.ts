export function formatProfileLabel(value?: string) {
  if (!value) return "";

  return value
    .trim()
    .toLocaleLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toLocaleUpperCase());
}

export function formatProfileLocation(value: unknown) {
  if (Array.isArray(value)) {
    if (value.length === 2 && value.every((coordinate) => Number(coordinate) === 0)) {
      return "";
    }

    return value.map(String).map((coordinate) => coordinate.trim()).filter(Boolean).join(", ");
  }

  if (typeof value !== "string") return "";

  const location = value.trim();
  if (/^\[?\s*0(?:\.0+)?\s*,\s*0(?:\.0+)?\s*\]?$/.test(location)) return "";

  return location;
}
