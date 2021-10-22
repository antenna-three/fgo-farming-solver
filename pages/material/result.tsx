import { GetStaticProps } from 'next'
import { getItems } from '../../lib/get-items'
import { revalidate } from '../../constants/revalidate'
import { Result } from '../../components/material/result'
import { Item } from '../../interfaces/atlas-academy'

export type MaterialResultProps = { items: (Item & { category: string })[] }

export const getStaticProps: GetStaticProps<MaterialResultProps> = async () => {
  const items = await getItems()
  return { props: { items }, revalidate }
}

export default Result
