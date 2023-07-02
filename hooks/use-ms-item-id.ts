import { useCallback, useMemo } from 'react'
import { Item } from '../interfaces/atlas-academy'

function getAscensionItemIntercept(item: Item): number | undefined {
  switch (item.background) {
    case 'silver':
      return 100
    case 'gold':
      return 110
    default:
      return undefined
  }
}

function getSkillItemIntercept(item: Item): number | undefined {
  switch (item.background) {
    case 'bronze':
      return 200
    case 'silver':
      return 210
    case 'gold':
      return 220
    default:
      return undefined
  }
}

function getGenericItemIntercept(item: Item): number | undefined {
  switch (item.background) {
    case 'bronze':
      return 300
    case 'silver':
      return 400
    case 'gold':
      return 500
    default:
      return undefined
  }
}

function getItemIntercept(item: Item): number | undefined {
  switch (Math.floor(item.priority / 100)) {
    case 1:
      return getSkillItemIntercept(item)
    case 2:
      return getGenericItemIntercept(item)
    case 3:
      return getAscensionItemIntercept(item)
    default:
      return undefined
  }
}

function getItemIndex(item: Item, items: Item[]): number {
  return items
    .filter(
      ({ background, priority }) =>
        background === item.background &&
        Math.floor(priority / 100) === Math.floor(item.priority / 100)
    )
    .findIndex(({ id }) => id === item.id)
}

export function toMsItemId(item: Item, items: Item[]): number {
  if (item.id === 1) {
    // QP
    return 900
  } else if (item.id === 6999) {
    // 伝承結晶
    return 800
  }
  const intercept = getItemIntercept(item)
  if (intercept == null) {
    return -1
  }
  return intercept + getItemIndex(item, items)
}

export const useMsItemId = (items: Item[]) => {
  const itemIdToMsItemId = useMemo(
    () =>
      items.reduce(
        (map, item) => map.set(item.id, toMsItemId(item, items)),
        new Map<number, number>()
      ),
    [items]
  )
  const msItemIdToItemId = useMemo(
    () =>
      items.reduce(
        (map, item) => map.set(toMsItemId(item, items), item.id),
        new Map<number, number>()
      ),
    [items]
  )
  const getItemId = useCallback(
    (msItemId: number) => msItemIdToItemId.get(msItemId),
    [msItemIdToItemId]
  )
  const getMsItemId = useCallback(
    (itemId: number) => itemIdToMsItemId.get(itemId),
    [itemIdToMsItemId]
  )
  return { getMsItemId, getItemId }
}
