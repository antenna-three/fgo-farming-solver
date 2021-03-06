import itemIds from '../data/item-ids.json'
import { Item } from '../interfaces/atlas-academy'

export const toApiItemId = (item: Item) => {
  const apiItemId = itemIds.find((ids) => ids.aaItemId == item.id)?.apiItemId
  if (apiItemId != null) {
    return apiItemId
  }
  if (100 <= item.priority && item.priority < 107) {
    //輝石
    return '3' + (item.priority - 100).toString(36)
  } else if (107 <= item.priority && item.priority < 114) {
    //魔石
    return '4' + (item.priority - 107).toString(36)
  } else if (114 <= item.priority && item.priority < 121) {
    //秘石
    return '5' + (item.priority - 114).toString(36)
  } else if (200 <= item.priority && item.priority < 212) {
    //銅素材
    return '0' + (item.priority - 200).toString(36)
  } else if (212 <= item.priority && item.priority < 222) {
    //銀素材
    return '1' + (item.priority - 212).toString(36)
  } else if (222 <= item.priority && item.priority < 234) {
    return '1' + (item.priority - 213).toString(36)
  } else if (234 <= item.priority && item.priority < 299) {
    //金素材
    return '2' + (item.priority - 234).toString(36)
  } else if (300 <= item.priority && item.priority < 307) {
    //ピース
    return '6' + (item.priority - 300).toString(36)
  } else if (307 <= item.priority && item.priority < 314) {
    //モニュメント
    return '7' + (item.priority - 307).toString(36)
  }
  return ''
}
