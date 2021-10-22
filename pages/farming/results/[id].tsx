import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next'
import { DBError } from '../../../lib/dynamodb'
import { Page } from '../../../components/farming/result'
import { getResult } from '../../../lib/get-result'
import { Result } from '../../../interfaces/api'

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export const getStaticProps: GetStaticProps<Result> = async ({ params }) => {
  if (typeof params?.id !== 'string') {
    return { notFound: true }
  }
  return await getResult(params.id)
    .then((result) => ({ props: result }))
    .catch((error) => {
      if (!(error instanceof DBError)) console.log(error)
      return { notFound: true }
    })
}

export default Page
