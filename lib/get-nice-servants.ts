import { NiceServant } from '../interfaces/atlas-academy'
import { fetchJson } from './fetch-json'
import { getUrl } from './get-url'

export const getNiceServants = async (locale?: string) => {
  const url = getUrl('nice_servant', locale)
  const servants = await fetchJson<NiceServant[]>(url)
  return servants
}
