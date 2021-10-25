import { GetStaticProps } from 'next'
import { getDrops } from '../../lib/get-drops'
import { Index } from '../../components/items'
import { Item } from '../../interfaces/fgodrop'
import { getLocalItems, Localized } from '../../lib/get-local-items'

export type ItemIndexProps = { items: Localized<Item>[] }

export const getStaticProps: GetStaticProps<ItemIndexProps> = async ({
  locale,
}) => {
  const { items } = await getDrops()
  const localItems = await getLocalItems(items, locale)
  return { props: { items: localItems } }
}

export default Index
