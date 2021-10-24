import { GetStaticPaths, GetStaticProps } from 'next'
import { getDrops } from '../../lib/get-drops'
import { Page } from '../../components/items/item'
import { DropRate, Item, Quest } from '../../interfaces/fgodrop'
import { serverSideTranslations } from '../../lib/server-side-translations'
import { getLocalQuests } from '../../lib/get-local-quests'
import { getLocalItems, Localized } from '../../lib/get-local-items'

export type ItemProps = {
  id: string
  items: Localized<Item>[]
  quests: Quest[]
  dropRates: DropRate[]
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ['ja'] }) => {
  const { items } = await getDrops()
  const paths = items.flatMap(({ id }) =>
    locales.map((locale) => ({ params: { id }, locale }))
  )
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ItemProps> = async ({
  params,
  locale,
}) => {
  if (typeof params?.id !== 'string') {
    return { notFound: true }
  }
  const { items, quests, drop_rates } = await getDrops()
  if (!items.some(({ id }) => id == params.id)) {
    return { notFound: true }
  }
  const [localItems, localQuests] = await Promise.all([
    getLocalItems(items, locale),
    getLocalQuests(quests, locale),
  ])
  const translations = await serverSideTranslations(locale)
  return {
    props: {
      id: params.id,
      items: localItems,
      quests: localQuests,
      dropRates: drop_rates,
      ...translations,
    },
    revalidate: 86400,
  }
}

export default Page
