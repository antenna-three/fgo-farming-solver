import { GetStaticProps } from 'next'
import { getDrops } from '../../lib/get-drops'
import { Index } from '../../components/items'
import { Item } from '../../interfaces/fgodrop'

export type ItemIndexProps = { items: Item[] }

export const getStaticProps: GetStaticProps<ItemIndexProps> = async () => {
  const { items } = await getDrops()
  return { props: { items } }
}

export default Index
