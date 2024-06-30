/**
 * 各サーヴァントのマテリアルNoからMaterial Simulatorのidへの`Map`
 * 
 * 基本的にはどちらもサーヴァントが追加されるごとにインクリメントされていくが、
 * 一部欠番や入れ替わりが存在する。
 * 
 * この`Map`は、前のNoからのインクリメントで対応づけられないペアの集合である。
 * 
 * マップにないNoについては、Noとidがともにインクリメントされているものとして扱ってよい。
 */
const noToMsIdMap = new Map([
  [1, 1],
  // ティアマト
  [149, 0],
  [150, 149],
  // ゲーティア
  [151, 0],
  // ソロモン
  [152, 0],
  [153, 150],
  [155, 153],
  // ビーストⅢ／Ｒ
  [168, 0],
  [169, 166],
  [179, 177],
  [182, 176],
  [183, 180],
  [191, 211],
  [192, 188],
  [196, 152],
  [197, 192],
  [216, 212],
  [229, 227],
  [230, 226],
  [231, 225],
  [232, 228],
  // ビーストⅢ／L
  [240, 0],
  [241, 236],
  [300, 296],
  [301, 295],
  [302, 297],
  // ビーストⅣ
  [333, 0],
  [334, 328],
  // Ｅ－フレアマリー
  [411, 0],
  // Ｅ－アクアマリー
  [412, 0],
  [413, 405]
])

function interpolate(map: Map<number, number>, index: number): number {
  const value = map.get(index)
  if (value) {
    return value
  }
  const [baseKey, baseValue] = [...map.entries()].sort(([a], [b]) => b - a).find(([key]) => key <= index) ?? [0, 0]
  return baseValue + (index - baseKey)
}

export function noToMsId(no: number) {
  return interpolate(noToMsIdMap, no)
}

const maxNo = Math.max(...noToMsIdMap.keys())
const msIdToNoMap = new Map(Array.from({ length: maxNo }, (_, i) => {
  const no = i + 1
  return [noToMsId(no), no] as const
}))

export function msIdToNo(msId: number) {
  return interpolate(msIdToNoMap, msId)
}
