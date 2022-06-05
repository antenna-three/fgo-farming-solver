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
  return items.map(({ id, category, name, ...rest }) => {
    const atlasItem = atlasItems.find((item) => toApiItemId(item) == id)
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
