import _ from 'underscore'

import type {Node} from 'react-checkbox-tree'

export function createTree(quests: {[key: string]: string}[]): {ids: string[], tree: Node[]} {
    const ids: string[] = []
    const tree = Object.entries(_.groupBy(quests, ({chapter}) => (chapter)))
        .map(([chapter, quests]) => {
            const chapterId = quests[0].id[0] + '0000'
            ids.push(chapterId)
            const subtree = Object.entries(_.groupBy(quests, ({area}) => (area)))
                .map(([area, quests]) => {
                    const areaId = quests[0].id.slice(0, 3) + '00'
                    ids.push(areaId)
                    const children = quests.map(({id, quest}) => {
                        ids.push(id)
                        return {value: id, label: quest}
                    })
                    return {label: area, value: areaId, children}
                })
            return {label: chapter, value: chapterId, children: subtree}
        })
    return {ids, tree}
}