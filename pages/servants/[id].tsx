import { GetStaticPaths, GetStaticProps } from 'next'
import { getNiceServants } from '../../lib/get-nice-servants'
import { getServants } from '../../lib/get-servants'
import { Page } from '../../components/servants/servant'

export const getStaticPaths: GetStaticPaths = async () => {
  const servants = await getServants()
  const paths = servants.map(({ id }) => ({
    params: { id: id.toString() },
  }))
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const servant = await getNiceServants().then((servants) =>
    servants.find(({ id }) => id.toString() == params?.id)
  )
  return servant == null ? { notFound: true } : { props: { servant } }
}

export default Page
