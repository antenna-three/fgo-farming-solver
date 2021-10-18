export const range = (a: number, b?: number) => {
  const start = b == null ? 0 : a
  const length = b == null ? a : b - a
  return Array.from({ length }, (v, k) => start + k)
}
