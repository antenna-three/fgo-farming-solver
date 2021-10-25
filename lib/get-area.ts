import { War } from '../interfaces/atlas-academy'

export const getArea = (wars: War[], questId: string) => {
  const sectionId = parseInt(questId[0], 36)
  const areaId = parseInt(questId[1], 36)
  if (sectionId == 0) {
    const classNames = [
      'Archer',
      'Lancer',
      'Berserker',
      'Rider',
      'Caster',
      'Assassin',
      'Saber',
    ]
    return `${classNames[areaId]} Training Ground`
  }
  const warId = sectionId * 100 + areaId + (sectionId == 1 ? 0 : 1)
  const longName = wars.find(({ id }) => id == warId)?.longName
  const shortName = longName?.split(/:|,/).slice(-1)[0]?.trim()
  return shortName
}
