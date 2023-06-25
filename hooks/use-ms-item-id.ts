import { useCallback, useMemo } from 'react'
import itemIds from '../data/item-ids.json'
import { Item } from '../interfaces/atlas-academy'

export const toMsItemId = (item: Item) => {
  const msItemId = itemIds.find(({ aaItemId }) => aaItemId == item.id)?.msItemId
  if (msItemId != null) {
    return msItemId
  }
  if (100 <= item.priority && item.priority < 107) {
    //輝石
    return item.priority - 100 + 200
  } else if (107 <= item.priority && item.priority < 114) {
    //魔石
    return item.priority - 107 + 210
  } else if (114 <= item.priority && item.priority < 121) {
    //秘石
    return item.priority - 114 + 220
  } else if (200 <= item.priority && item.priority < 214) {
    //銅素材
    return item.priority - 200 + 300
  } else if (214 <= item.priority && item.priority < 223) {
    //銀素材
    return item.priority - 214 + 400
  } else if (224 <= item.priority && item.priority < 238) {
    return item.priority - 215 + 400
  } else if (238 <= item.priority && item.priority < 299) {
    //金素材
    return item.priority - 238 + 500
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
    () => Object.fromEntries(items.map((item) => [item.id, toMsItemId(item)])),
    [items]
  )
  const msItemIdToItemId = useMemo(
    () => Object.fromEntries(items.map((item) => [toMsItemId(item), item.id])),
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
