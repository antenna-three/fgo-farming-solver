import _ from 'underscore'

import type {Node} from 'react-checkbox-tree'

export function createTree(quests: {section: string, area: string, name: string, id: string}[]): {ids: string[], tree: Node[]} {
    const ids: string[] = []
    const tree = Object.entries(_.groupBy(quests, ({section}) => (section)))
        .map(([section, quests]) => {
            const sectionId = quests[0].id[0]
            ids.push(sectionId)
            const subtree = Object.entries(_.groupBy(quests, ({area}) => (area)))
                .map(([area, quests]) => {
                    const areaId = quests[0].id.slice(0, 2)
                    ids.push(areaId)
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