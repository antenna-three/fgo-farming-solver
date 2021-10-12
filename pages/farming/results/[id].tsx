import { GetStaticProps, GetStaticPaths } from 'next'
import { DBError, getDynamoDb } from '../../../lib/dynamodb'
import { Result } from '../../../components/farming/result'

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const notFound: { notFound: true } = { notFound: true }
  if (params == null || typeof params.id !== 'string') {
    return notFound
  }
  const res = await getDynamoDb({
    tableName: 'fgo-farming-solver-results',
    key: { id: params.id },
  })
    .then((result) => ({ props: result }))
    .catch((error) => {
      if (!(error instanceof DBError)) console.log(error)
      return notFound
    })
  return res
}

export default Result
