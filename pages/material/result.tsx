import { GetStaticProps } from 'next'
import { getItems } from '../../lib/get-items'
import { revalidate } from '../../constants/revalidate'
import { Result } from '../../components/material/result'
import { Item } from '../../interfaces/atlas-academy'

export type MaterialResultProps = {
  items: (Item & { largeCategory: string; category: string })[]
}

export const getStaticProps: GetStaticProps<MaterialResultProps> = async ({
  locale,
}) => {
  const items = await getItems(locale)
  return { props: { items }, revalidate }
}

export default Result
