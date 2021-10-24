import { GetStaticProps } from 'next'
import { revalidate } from '../../constants/revalidate'
import { getServants } from '../../lib/get-servants'
import { Index } from '../../components/servants'
import { groupBy } from '../../utils/group-by'
import { Servant } from '../../interfaces/atlas-academy'
import { serverSideTranslations } from '../../lib/server-side-translations'

export type ServantIndexProps = {
  servantGroups: { [className: string]: Servant[] }
}

export const getStaticProps: GetStaticProps<ServantIndexProps> = async ({
  locale,
}) => {
  const [servants, translations] = await Promise.all([
    getServants(locale),
    serverSideTranslations(locale),
  ])
  const servantGroups = groupBy(servants, (servant) => servant.className)
  return { props: { servantGroups, ...translations }, revalidate }
}

export default Index
