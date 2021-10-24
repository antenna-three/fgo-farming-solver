import { getArea } from './get-area'
import { getQuestTranslation } from './get-quest-translation'
import { getWars } from './get-wars'

type Quest = { id: string; section: string; area: string; name: string }

export const getLocalQuests = async <Q extends Quest>(
  quests: Q[],
  locale: string = 'ja'
): Promise<Q[]> => {
  if (locale == 'ja') return quests
  const [translation, wars] = await Promise.all([
    getQuestTranslation(),
    getWars('en'),
  ])
  return quests.map(({ id, section, area, name, ...rest }) => {
    const enSection =
      section == '修練場'
        ? 'Training Ground'
        : section.replace(/第(.+)部/, 'Section $1')
    const enArea = getArea(wars, id) || area
    const enName = translation[name]
    return { id, section: enSection, area: enArea, name: enName, ...rest } as Q
  })
}
