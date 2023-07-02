import { getItems } from './get-items'
import { toApiItemId } from './to-api-item-id'

type Item = { id: string; category: string; name: string }
export type Localized<I extends Item> = I & {
  largeCategory: string
  shortName: string
}

export const getLocalItems = async <I extends Item>(
  items: I[],
  locale = 'ja'
): Promise<Localized<I>[]> => {
  const atlasItems = await getItems(locale)
  const atlasItemMap = atlasItems.reduce(
    (map, item) => map.set(toApiItemId(item, atlasItems), item),
    new Map<string, (typeof atlasItems)[number]>()
  )
  return items.map(({ id, category, name, ...rest }) => {
    const atlasItem = atlasItemMap.get(id)
    return {
      id,
      category: atlasItem?.category ?? category,
      largeCategory: atlasItem?.largeCategory ?? '',
      shortName: name,
      name: atlasItem?.name ?? name,
      ...rest,
    } as Localized<I>
  })
}
