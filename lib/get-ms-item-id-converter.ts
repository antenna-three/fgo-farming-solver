import { Item } from '../interfaces'

export const getMsItemIdConverter = (items: Item[]) => {
  const itemToMsItemId = (item: Item) => {
    if (100 <= item.priority && item.priority < 107) {
      //輝石
      return (item.priority - 100 + 200).toString()
    } else if (107 <= item.priority && item.priority < 114) {
      //魔石
      return (item.priority - 107 + 210).toString()
    } else if (114 <= item.priority && item.priority < 121) {
      //秘石
      return (item.priority - 114 + 220).toString()
    } else if (200 <= item.priority && item.priority < 210) {
      //銅素材
      return (item.priority - 200 + 300).toString()
    } else if (210 <= item.priority && item.priority < 220) {
      //銀素材
      return (item.priority - 210 + 400).toString()
    } else if (220 <= item.priority && item.priority < 232) {
      return (item.priority - 211 + 400).toString()
    } else if (232 <= item.priority && item.priority < 299) {
      //金素材
      return (item.priority - 232 + 500).toString()
    } else if (300 <= item.priority && item.priority < 307) {
      //ピース
      return (item.priority - 300 + 100).toString()
    } else if (307 <= item.priority && item.priority < 314) {
      //モニュメント
      return (item.priority - 307 + 110).toString()
    } else if (item.priority == 299) {
      //伝承結晶
      return '800'
    } else if (item.priority == 10) {
      //QP
      return '900'
    }
  }
  const itemIdToMsItemId = Object.fromEntries(
    items.map((item) => [item.id, itemToMsItemId(item)])
  )
  const msItemIdToItemId = Object.fromEntries(
    items.map((item) => [itemToMsItemId(item), item.id])
  )
  const getItemId = (msItemId: string) => msItemIdToItemId[msItemId]
  const getMsItemId = (itemId: string) => itemIdToMsItemId[itemId]
  return { getMsItemId, getItemId }
}
