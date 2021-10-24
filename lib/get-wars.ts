import { War } from './../interfaces/atlas-academy'
import { fetchJsonWithCache } from './cache'
import { getHash } from './get-hash'
import { getUrl } from './get-url'

export const getWars = async (locale?: string) => {
  const hash = await getHash()
  const url = getUrl('basic_war', locale)
  const wars = fetchJsonWithCache(url, hash).then((wars: War[]) =>
    wars.filter((war) => war.eventId == 0)
  )
  return wars
}
