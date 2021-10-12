import { GetStaticProps } from 'next'
import _ from 'lodash'
import { revalidate } from '../../constants/revalidate'
import { getServants } from '../../lib/get-servants'
import { Index } from '../../components/servants'

export const getStaticProps: GetStaticProps = async () => {
  const servants = await getServants()
  const servantGroups = _.groupBy(servants, (servant) => servant.className)
  return { props: { servantGroups }, revalidate }
}

export default Index
