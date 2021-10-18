import { GetStaticProps } from 'next'
import { getItems } from '../../lib/get-items'
import { revalidate } from '../../constants/revalidate'
import { Result } from '../../components/material/result'

export const getStaticProps: GetStaticProps = async () => {
  const items = await getItems()
  return { props: { items }, revalidate }
}

export default Result
