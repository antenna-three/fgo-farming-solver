export const entries = <K extends string, V>(obj: Record<K, V>): [K, V][] =>
  Object.entries(obj) as [K, V][]

export const fromEntries = <K extends string, V>(
  entries: [K, V][]
): Record<K, V> => Object.fromEntries(entries) as Record<K, V>
