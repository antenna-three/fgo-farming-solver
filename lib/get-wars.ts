import { War } from './../interfaces/atlas-academy'
import { getUrl } from './get-url'

export const getWars = async (locale?: string) => {
  const url = getUrl('basic_war', locale)
  const wars = fetch(url)
    .then((res) => res.json())
    .then((wars: War[]) => wars.filter((war) => war.eventId == 0))
  return wars
}
