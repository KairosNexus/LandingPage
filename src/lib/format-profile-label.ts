export function formatProfileLabel(value?: string) {
  if (!value) return "";

  return value
    .trim()
    .toLocaleLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toLocaleUpperCase());
}
