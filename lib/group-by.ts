export const groupBy = <K extends PropertyKey, V>(
  array: readonly V[],
  getKey: (cur: V, idx: number, src: readonly V[]) => K
) =>
  array.reduce((obj, cur, idx, src) => {
    const key = getKey(cur, idx, src)
    ;(obj[key] || (obj[key] = []))!.push(cur)
    return obj
  }, {} as Record<K, V[]>)

export const indexBy = <K extends PropertyKey, V>(
  array: readonly V[],
  getKey: (cur: V, idx: number, src: readonly V[]) => K
) =>
  array.reduce((obj, cur, idx, src) => {
    const key = getKey(cur, idx, src)
    obj[key] = cur
    return obj
  }, {} as Record<K, V>)

export const zip = <T>(...arrays: T[][]) => {
  const length = arrays.reduce(
    (acc, cur) => (cur.length < acc ? cur.length : acc),
    Infinity
  )
  return Array.from({ length }, (v, k) => k).map((i) =>
    arrays.map((array) => array[i])
  )
}
