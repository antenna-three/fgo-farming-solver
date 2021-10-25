import { GetStaticPaths, GetStaticProps } from 'next'
import { getNiceServants } from '../../lib/get-nice-servants'
import { getServants } from '../../lib/get-servants'
import { Page } from '../../components/servants/servant'
import { NiceServant } from '../../interfaces/atlas-academy'

export type ServantProps = { servant: NiceServant }

export const getStaticPaths: GetStaticPaths = async ({ locales = ['ja'] }) => {
  const servants = await getServants()
  const paths = servants.flatMap(({ id }) =>
    locales.map((locale) => ({
      params: { id: id.toString() },
      locale,
    }))
  )
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps<ServantProps> = async ({
  params,
  locale,
}) => {
  const servant = await getNiceServants(locale).then((servants) =>
    servants.find(({ id }) => id.toString() == params?.id)
  )
  return servant == null ? { notFound: true } : { props: { servant } }
}

export default Page
