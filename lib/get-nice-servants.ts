import { NiceServant } from '../interfaces/atlas-academy'
import { fetchJsonWithCache } from './cache'
import { getUrl } from './get-url'

export const getNiceServants = async (locale?: string) => {
  const url = getUrl('nice_servant', locale)
  const servants = await fetchJsonWithCache<NiceServant[]>(url)
  return servants
}
