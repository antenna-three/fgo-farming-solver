import { useCallback, useMemo } from 'react'
import { Item } from '../interfaces/atlas-academy'

const itemToMsItemId = (item: Item) => {
  if (100 <= item.priority && item.priority < 107) {
    //輝石
    return item.priority - 100 + 200
  } else if (107 <= item.priority && item.priority < 114) {
    //魔石
    return item.priority - 107 + 210
  } else if (114 <= item.priority && item.priority < 121) {
    //秘石
    return item.priority - 114 + 220
  } else if (200 <= item.priority && item.priority < 212) {
    //銅素材
    return item.priority - 200 + 300
  } else if (212 <= item.priority && item.priority < 222) {
    //銀素材
    return item.priority - 212 + 400
  } else if (222 <= item.priority && item.priority < 234) {
    return item.priority - 213 + 400
  } else if (234 <= item.priority && item.priority < 299) {
    //金素材
    return item.priority - 234 + 500
  } else if (300 <= item.priority && item.priority < 307) {
    //ピース
    return item.priority - 300 + 100
  } else if (307 <= item.priority && item.priority < 314) {
    //モニュメント
    return item.priority - 307 + 110
  } else if (item.priority == 299) {
    //伝承結晶
    return 800
  } else if (item.priority == 10) {
    //QP
    return 900
  } else {
    return 0
  }
}

export const useMsItemId = (items: Item[]) => {
  const itemIdToMsItemId = useMemo(
    () =>
      Object.fromEntries(items.map((item) => [item.id, itemToMsItemId(item)])),
    [items]
  )
  const msItemIdToItemId = useMemo(
    () =>
      Object.fromEntries(items.map((item) => [itemToMsItemId(item), item.id])),
    [items]
  )
  const getItemId = useCallback(
    (msItemId: string) => msItemIdToItemId[msItemId],
    [msItemIdToItemId]
  )
  const getMsItemId = useCallback(
    (itemId: string) => itemIdToMsItemId[itemId],
    [itemIdToMsItemId]
  )
  return { getMsItemId, getItemId }
}
