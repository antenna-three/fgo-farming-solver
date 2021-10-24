import { orderBy } from '../utils/order-by'
import { origin, region } from '../constants/atlasacademy'
import { Servant } from '../interfaces/atlas-academy'
import { getUrl } from './get-url'

export const getServants = async (locale?: string) => {
  const enumUrl = `${origin}/export/${region}/nice_enums.json`
  const classNames: string[] = await fetch(enumUrl)
    .then((res) => res.json())
    .then((obj) => Object.values(obj.SvtClass))
  const servantsUrl = getUrl('basic_servant', locale)
  const servants = fetch(servantsUrl)
    .then((res) => res.json())
    //exclude npc servants
    .then((servants: Servant[]) =>
      servants.filter(({ type }) => type == 'normal' || type == 'heroine')
    )
    //sort by class name as a primary key and by rarity as a secondary key
    .then((servants) =>
      servants.sort(
        orderBy(
          ({ className, rarity }) =>
            classNames.indexOf(className) * 10 - rarity,
          'asc'
        )
      )
    )
  return servants
}
