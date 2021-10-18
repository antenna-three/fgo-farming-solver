import { GetStaticPaths, GetStaticProps } from 'next'
import { getGzip } from '../../lib/get-s3'
import { Page } from '../../components/items/item'

export const getStaticPaths: GetStaticPaths = async () => {
  const { items } = await getGzip('all.json.gz')
  const paths = items.map(({ id }) => ({ params: { id: id as string } }))
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params == null || !('id' in params) || typeof params.id !== 'string') {
    return { notFound: true }
  }
  let { items, quests, drop_rates } = await getGzip('all.json.gz')
  const id = params.id
  if (items == null || !items.map(({ id }) => id).includes(id)) {
    return { notFound: true }
  }
  const questIds = drop_rates
    .filter(({ item_id }) => item_id == id)
    .map(({ quest_id }) => quest_id)
  const filteredQuests = quests.filter(({ id }) => questIds.includes(id))
  return {
    props: {
      id,
      items,
      quests: filteredQuests,
      dropRates: drop_rates,
    },
    revalidate: 86400,
  }
}

export default Page
