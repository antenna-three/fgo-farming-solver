import { Index } from '../../components/farming'
import { Drops, getDrops } from '../../lib/get-drops'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from '../../lib/server-side-translations'
import { getLocalQuests } from '../../lib/get-local-quests'
import { getLocalItems, Localized } from '../../lib/get-local-items'
import { Item } from '../../interfaces/fgodrop'

export type FarmingIndexProps = Omit<Drops, 'items'> & {
  items: Localized<Item>[]
}

export const getStaticProps: GetStaticProps<FarmingIndexProps> = async ({
  locale,
}) => {
  const [{ items, quests, drop_rates }, translations] = await Promise.all([
    getDrops(),
    serverSideTranslations(locale),
  ])
  const localQuests = await getLocalQuests(quests, locale)
  const localItems = await getLocalItems(items, locale)

  return {
    props: {
      items: localItems,
      quests: localQuests,
      drop_rates,
      ...translations,
    },
    revalidate: 86400,
  }
}

export default Index
