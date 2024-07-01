import { War } from './../interfaces/atlas-academy'
import { fetchJson } from './fetch-json'
import { getUrl } from './get-url'

export const getWars = async (locale?: string) => {
  const url = getUrl('basic_war', locale)
  const wars = await fetchJson<War[]>(url)
  return wars.filter((war) => war.eventId == 0)
}
