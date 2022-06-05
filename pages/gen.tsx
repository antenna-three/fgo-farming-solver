import { GetStaticProps } from 'next'
import { generateItemIds } from '../lib/generate-item-ids'
import { getItems } from '../lib/get-items'

export const getStaticProps: GetStaticProps = async () => {
  if (process.env.NODE_ENV == 'production') {
    return { notFound: true }
  }
  const items = await getItems()
  generateItemIds(items)
  return { props: {} }
}

const ItemIds = () => <></>
export default ItemIds
