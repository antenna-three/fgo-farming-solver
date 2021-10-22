import { GetStaticPaths, GetStaticProps } from 'next'
import { getDrops } from '../../lib/get-drops'
import { Page } from '../../components/items/item'
import { getItems } from '../../lib/get-items'
import { DropRate, Item, Quest } from '../../interfaces/fgodrop'
import { Item as AtlasItem } from '../../interfaces/atlas-academy'

export type ItemProps = {
  id: string
  items: Item[]
  quests: Quest[]
  dropRates: DropRate[]
  atlasItems: AtlasItem[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { items } = await getDrops()
  const paths = items.map(({ id }) => ({ params: { id: id as string } }))
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ItemProps> = async ({ params }) => {
  if (typeof params?.id !== 'string') {
    return { notFound: true }
  }
  const [{ items, quests, drop_rates }, atlasItems] = await Promise.all([
    getDrops(),
    getItems(),
  ])
  if (!items.some(({ id }) => id == params.id)) {
    return { notFound: true }
  }
  return {
    props: {
      id: params.id,
      items,
      quests,
      dropRates: drop_rates,
      atlasItems,
    },
    revalidate: 86400,
  }
}

export default Page
