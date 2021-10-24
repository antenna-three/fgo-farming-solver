import { getUrl } from './get-url'
import { NiceServant } from '../interfaces/atlas-academy'
import { fetchJsonWithCache } from './cache'
import { getHash } from './get-hash'

export const getNiceServants = async (locale?: string) => {
  const url = getUrl('nice_servant', locale)
  const hash = await getHash()
  const servants: NiceServant[] = await fetchJsonWithCache(url, hash)
  return servants
}
