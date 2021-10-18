import { GetStaticProps } from 'next'
import { revalidate } from '../../constants/revalidate'
import { getServants } from '../../lib/get-servants'
import { Index } from '../../components/servants'
import { groupBy } from '../../lib/group-by'

export const getStaticProps: GetStaticProps = async () => {
  const servants = await getServants()
  const servantGroups = groupBy(servants, (servant) => servant.className)
  return { props: { servantGroups }, revalidate }
}

export default Index
