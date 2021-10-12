import { GetStaticProps } from 'next'
import { getGzip } from '../../lib/get-s3'
import { Index } from '../../components/items'

export const getStaticProps: GetStaticProps = async () => {
  const { items } = await getGzip('all.json.gz')
  return { props: { items } }
}

export default Index
