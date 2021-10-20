export const orderBy = <T>(
  keyFunc: (key: T) => number,
  order: 'asc' | 'desc' = 'asc'
): ((a: T, b: T) => number) =>
  order == 'desc'
    ? (a: T, b: T) => keyFunc(b) - keyFunc(a)
    : (a: T, b: T) => keyFunc(a) - keyFunc(b)
