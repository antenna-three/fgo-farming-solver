import { Item } from '../interfaces/atlas-academy'
import { orderBy } from '../utils/order-by'
import { fetchJsonWithCache } from './cache'
import { getUrl } from './get-url'

const largeCategories: { [locale: string]: string[] } = {
  en: ['QP', 'Gems', 'Common Items', 'Monuments and Pieces'],
  ja: ['QP', 'スキル石', '強化素材', 'モニュピ'],
}
const categories: { [locale: string]: { [background: string]: string }[] } = {
  en: [
    { zero: 'QP' },
    { bronze: 'Shining', silver: 'Magic', gold: 'Secret' },
    { bronze: 'Bronze', silver: 'Silver', gold: 'Gold' },
    { silver: 'Piece', gold: 'Monument' },
  ],
  ja: [
    { zero: 'QP' },
    { bronze: '輝石', silver: '魔石', gold: '秘石' },
    { bronze: '銅素材', silver: '銀素材', gold: '金素材' },
    { silver: 'ピース', gold: 'モニュメント' },
  ],
}

const getCategory = (item: Item, locale: string) => {
  const index = Math.floor(item.priority / 100)
  const largeCategory =
    largeCategories[locale]?.[index] ??
    (locale == 'en' ? 'Event Item' : 'イベントアイテム')
  const category =
    categories[locale]?.[index]?.[item.background] ??
    (locale == 'en' ? 'Special Ascension Item' : '特殊霊基再臨素材')
  return { largeCategory, category }
}

export const getItems = async (locale = 'ja') => {
  const url = getUrl('nice_item', locale)
  const targetTypes = ['qp', 'skillLvUp', 'tdLvUp']
  const items = fetchJsonWithCache(url).then((items: Item[]) =>
    items
      .filter((item) => targetTypes.includes(item.type))
      .map((item) => ({ ...item, ...getCategory(item, locale) }))
      .sort(orderBy(({ priority }) => priority, 'asc'))
  )
  return items
}
