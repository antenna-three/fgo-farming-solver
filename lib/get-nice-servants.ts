import { getUrl } from './get-url'
import { NiceServant } from '../interfaces/atlas-academy'

export const getNiceServants = async (locale?: string) => {
  const url = getUrl('nice_servant', locale)
  const servants: NiceServant[] = await fetch(url).then((res) => res.json())
  return servants
}
