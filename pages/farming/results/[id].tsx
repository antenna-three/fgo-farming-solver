import { GetStaticProps, GetStaticPaths } from 'next'
import { DBError, getDynamoDb } from '../../../lib/dynamodb'
import { Page } from '../../../components/farming/result'

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params?.id !== 'string') {
    return { notFound: true }
  }
  return await getDynamoDb({
    tableName: 'fgo-farming-solver-results',
    key: { id: params.id },
  })
    .then((result) => ({ props: result }))
    .catch((error) => {
      if (!(error instanceof DBError)) console.log(error)
      return { notFound: true }
    })
}

export default Page
