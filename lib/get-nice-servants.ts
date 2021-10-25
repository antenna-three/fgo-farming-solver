import { getUrl } from './get-url'
import { NiceServant } from '../interfaces/atlas-academy'
import { fetchJsonWithCache } from './cache'

export const getNiceServants = async (locale?: string) => {
  const url = getUrl('nice_servant', locale)
  const servants: NiceServant[] = await fetchJsonWithCache(url)
  return servants
}
