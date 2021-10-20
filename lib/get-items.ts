import { origin, region } from '../constants/atlasacademy'
import { Item } from '../interfaces/atlas-academy'
import { fetchJsonWithCache } from './cache'
import { getHash } from './get-hash'
import { orderBy } from '../utils/order-by'

const getCategory = (item: Item) => {
  switch (Math.floor(item.priority / 100)) {
    case 0:
      return 'QP'
    case 1:
      switch (item.background) {
        case 'bronze':
          return '輝石'
        case 'silver':
          return '魔石'
        case 'gold':
          return '秘石'
      }
    case 2:
      switch (item.background) {
        case 'bronze':
          return '銅素材'
        case 'silver':
          return '銀素材'
        case 'gold':
          return '金素材'
      }
    case 3:
      switch (item.background) {
        case 'silver':
          return 'ピース'
        case 'gold':
          return 'モニュメント'
      }
    default:
      return '特殊霊基再臨素材'
  }
}

export const getItems = async () => {
  const url = `${origin}/export/${region}/nice_item.json`
  const hash = await getHash()
  const targetTypes = ['qp', 'skillLvUp', 'tdLvUp']
  return fetchJsonWithCache(url, hash).then((items: Item[]) =>
    items
      .filter((item) => targetTypes.includes(item.type))
      .map((item) => ({ ...item, category: getCategory(item) }))
      .sort(orderBy(({ priority }) => priority, 'asc'))
  )
}
