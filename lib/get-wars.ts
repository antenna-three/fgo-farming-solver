import { War } from './../interfaces/atlas-academy'
import { fetchJsonWithCache } from './cache'
import { getUrl } from './get-url'

export const getWars = async (locale?: string) => {
  const url = getUrl('basic_war', locale)
  const wars = fetchJsonWithCache(url).then((wars: War[]) =>
    wars.filter((war) => war.eventId == 0)
  )
  return wars
}
