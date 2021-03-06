import { origin, region } from '../constants/atlasacademy'

export const getUrl = (basename: string, locale = 'ja') => {
  const suffix = locale == 'en' ? '_lang_en' : ''
  return `${origin}/export/${region}/${basename}${suffix}.json`
}
