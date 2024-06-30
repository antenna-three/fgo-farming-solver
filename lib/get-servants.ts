import { origin, region } from '../constants/atlasacademy'
import { Servant } from '../interfaces/atlas-academy'
import { orderBy } from '../utils/order-by'
import { fetchJson } from './fetch-json'
import { getUrl } from './get-url'

export const getServants = async (locale?: string) => {
  const enumUrl = `${origin}/export/${region}/nice_enums.json`
  const classNames: string[] = await fetchJson(enumUrl).then((obj) =>
    Object.values((obj as { SvtClass: string }).SvtClass)
  )
  const servantsUrl = getUrl('basic_servant', locale)
  const servants = await fetchJson<Servant[]>(servantsUrl)
  return servants
    //exclude npc servants
    .filter(({ type }) => type == 'normal' || type == 'heroine')
    //sort by class name as a primary key and by rarity as a secondary key
    .sort(
      orderBy(
        ({ className, rarity }) =>
          classNames.indexOf(className) * 10 - rarity,
        'asc'
      )
    )
}
