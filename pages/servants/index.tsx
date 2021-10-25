import { GetStaticProps } from 'next'
import { revalidate } from '../../constants/revalidate'
import { getServants } from '../../lib/get-servants'
import { Index } from '../../components/servants'
import { Servant } from '../../interfaces/atlas-academy'

export type ServantIndexProps = {
  servants: Servant[]
}

export const getStaticProps: GetStaticProps<ServantIndexProps> = async ({
  locale,
}) => {
  const servants = await getServants(locale)
  return { props: { servants }, revalidate }
}

export default Index
