import { GetStaticPaths, GetStaticProps } from 'next'
import { getDrops } from '../../lib/get-drops'
import { Page } from '../../components/items/item'

export const getStaticPaths: GetStaticPaths = async () => {
  const { items } = await getDrops()
  const paths = items.map(({ id }) => ({ params: { id: id as string } }))
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params?.id !== 'string') {
    return { notFound: true }
  }
  const { items, quests, drop_rates } = await getDrops()
  if (!items.some(({ id }) => id == params.id)) {
    return { notFound: true }
  }
  const requiredQuests = drop_rates
    .filter(({ item_id }) => item_id == params.id)
    .map(({ quest_id }) => quests.find(({ id }) => id == quest_id))
  return {
    props: {
      id: params.id,
      items,
      quests: requiredQuests,
      dropRates: drop_rates,
    },
    revalidate: 86400,
  }
}

export default Page
