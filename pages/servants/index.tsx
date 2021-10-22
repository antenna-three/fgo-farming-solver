import { GetStaticProps } from 'next'
import { revalidate } from '../../constants/revalidate'
import { getServants } from '../../lib/get-servants'
import { Index } from '../../components/servants'
import { groupBy } from '../../utils/group-by'
import { Servant } from '../../interfaces/atlas-academy'

export type ServantIndexProps = {
  servantGroups: { [className: string]: Servant[] }
}

export const getStaticProps: GetStaticProps<ServantIndexProps> = async () => {
  const servants = await getServants()
  const servantGroups = groupBy(servants, (servant) => servant.className)
  return { props: { servantGroups }, revalidate }
}

export default Index
