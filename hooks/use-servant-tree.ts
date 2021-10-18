import { useMemo } from 'react'
import { jpClassNames } from '../constants/jp-class-names'
import { Servant } from '../interfaces/atlas-academy'
import { Node } from '../components/common/checkbox-tree'
import { groupBy } from '../lib/group-by'

export const useServantTree = (servants: Servant[]): Node[] =>
  useMemo(() => {
    return [
      {
        label: '全サーヴァント',
        value: 'all',
        children: Object.entries(
          groupBy(servants, ({ className }) => className)
        ).map(([className, servants]) => getClassNode(className, servants)),
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

export const getClassNode = (className: string, servants: Servant[]): Node => ({
  label: jpClassNames[className],
  value: className,
  children: servants.map((servant) => ({
    label: servant.name,
    value: servant.id.toString(),
  })),
})
