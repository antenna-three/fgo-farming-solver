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

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  if (
    params == null ||
    typeof params.id != 'string' ||
    Number.isNaN(parseInt(params.id))
  ) {
    return { notFound: true }
  }
  const intId = parseInt(params.id)
  const niceServant = await getNiceServants().then((servants) =>
    servants.find(({ id }) => id == intId)
  )
  if (niceServant == null) {
    return { notFound: true }
  }
  return {
    props: { servant: niceServant },
  }
}

export default Page
