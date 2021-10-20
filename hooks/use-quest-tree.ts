import { groupBy } from '../utils/group-by'
import { useMemo } from 'react'
import { Node } from '../components/common/checkbox-tree'

export const useQuestTree = (
  quests: { section: string; area: string; name: string; id: string }[]
): { ids: string[]; tree: Node[] } =>
  useMemo(() => {
    const ids: string[] = []
    const tree = Object.entries(groupBy(quests, ({ id }) => id[0])).map(
      ([sectionId, quests]) => {
        ids.push(sectionId)
        const section = quests[0].section
        const subtree = Object.entries(
          groupBy(quests, ({ id }) => id.slice(0, 2))
        ).map(([areaId, quests]) => {
          ids.push(areaId)
          const area = quests[0].area
          const children = quests.map(({ id, name }) => {
            ids.push(id)
            return { value: id, label: name }
          })
          return { label: area, value: areaId, children }
        })
        return { label: section, value: sectionId, children: subtree }
      }
    )
    return { ids, tree }
  }, [quests])
