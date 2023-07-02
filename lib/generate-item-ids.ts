import fs from 'fs/promises'
import path from 'path'
import { toMsItemId } from '../hooks/use-ms-item-id'
import { Item } from '../interfaces/atlas-academy'
import { toApiItemId } from './to-api-item-id'

export const generateItemIds = async (items: Item[]) => {
  const itemIds = items
    .map((item) => ({
      aaItemId: item.id,
      msItemId: toMsItemId(item, items),
      apiItemId: toApiItemId(item, items),
    }))
    .filter(({ msItemId, apiItemId }) => msItemId || apiItemId)
  const json = JSON.stringify(itemIds, null, 4)
  await fs.writeFile(
    path.resolve(process.env.BASE_DIR ?? '', 'data/item-ids.json'),
    json
  )
}
