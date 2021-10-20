import { GetStaticProps } from 'next'
import { getDrops } from '../../lib/get-drops'
import { Index } from '../../components/items'

export const getStaticProps: GetStaticProps = async () => {
  const { items } = await getDrops()
  return { props: { items } }
}

export default Index
