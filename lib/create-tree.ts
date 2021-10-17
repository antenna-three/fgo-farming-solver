import _ from 'lodash'
import { jpClassNames } from '../constants/jp-class-names'

//import type { Node } from 'react-checkbox-tree'
import type { Servant } from '../interfaces/atlas-academy'

type Node = { label: string; value: string; children?: Node[] }

export function createQuestTree(
  quests: { section: string; area: string; name: string; id: string }[]
): { ids: string[]; tree: Node[] } {
  const ids: string[] = []
  const tree = Object.entries(_.groupBy(quests, ({ id }) => id[0])).map(
    ([sectionId, quests]) => {
      ids.push(sectionId)
      const section = quests[0].section
      const subtree = Object.entries(
        _.groupBy(quests, ({ id }) => id.slice(0, 2))
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
}

export function createServantTree(servants: Servant[]): Node[] {
  return [
    {
      label: '全サーヴァント',
      value: 'all',
      children: Object.entries(
        _.groupBy(servants, ({ className }) => className)
      ).map(([className, servants]) => createClassNode(className, servants)),
    },
  ]
}

export function createClassNode(className: string, servants: Servant[]): Node {
  return {
    label: jpClassNames[className],
    value: className,
    children: servants.map((servant) => ({
      label: servant.name,
      value: servant.id.toString(),
    })),
  }
}
