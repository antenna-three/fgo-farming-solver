import { Index } from '../../components/farming'
import { Drops, getDrops } from '../../lib/get-drops'
import { GetStaticProps } from 'next'
import { getLocalQuests } from '../../lib/get-local-quests'
import { getLocalItems, Localized } from '../../lib/get-local-items'
import { Item } from '../../interfaces/fgodrop'

export type FarmingIndexProps = Omit<Drops, 'items'> & {
  items: Localized<Item>[]
}

export const getStaticProps: GetStaticProps<FarmingIndexProps> = async ({
  locale,
}) => {
  const { items, quests, drop_rates } = await getDrops()
  const [localItems, localQuests] = await Promise.all([
    getLocalItems(items, locale),
    getLocalQuests(quests, locale),
  ])

  return {
    props: {
      items: localItems,
      quests: localQuests,
      drop_rates,
    },
    revalidate: 86400,
  }
}

export default Index
