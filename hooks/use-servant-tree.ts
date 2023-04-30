import { useMemo } from 'react'
import { Servant } from '../interfaces/atlas-academy'
import { Node } from '../components/common/checkbox-tree'
import { groupBy } from '../utils/group-by'
import { getClassName } from '../lib/class-names'

export const useServantTree = (servants: Servant[], locale = 'ja'): Node[] =>
  useMemo(() => {
    return [
      {
        label: locale == 'en' ? 'All Servants' : '全サーヴァント',
        value: 'all',
        children: Object.entries(
          groupBy(servants, ({ className }) => className)
        ).map(([className, servants]) =>
          getClassNode(className, servants, locale)
        ),
      },
    ]
  }, [locale, servants])

export const getClassNode = (
  className: string,
  servants: Servant[],
  locale = 'ja'
): Node => ({
  label: getClassName(className, locale),
  value: className,
  children: servants.map((servant) => ({
    label: servant.name,
    value: servant.id.toString(),
  })),
})
