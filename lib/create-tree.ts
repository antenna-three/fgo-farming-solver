import _ from 'underscore'

import type {Node} from 'react-checkbox-tree'

export function createTree(quests: {section: string, area: string, name: string, id: string}[]): {ids: string[], tree: Node[]} {
    const ids: string[] = []
    const tree = Object.entries(_.groupBy(quests, ({id}) => (id[0])))
        .map(([sectionId, quests]) => {
            ids.push(sectionId)
            const section = quests[0].section
            const subtree = Object.entries(_.groupBy(quests, ({id}) => (id.slice(0, 2))))
                .map(([areaId, quests]) => {
                    ids.push(areaId)
                    const area = quests[0].area
                    const children = quests.map(({id, name}) => {
                        ids.push(id)
                        return {value: id, label: name}
                    })
                    return {label: area, value: areaId, children}
                })
            return {label: section, value: sectionId, children: subtree}
        })
    return {ids, tree}
}