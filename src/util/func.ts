export function strUndefCheck(value: string | undefined): string {
  return value!==undefined ? value : "";
}