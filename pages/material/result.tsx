import { GetStaticProps } from 'next'
import { getItems } from '../../lib/get-items'
import { revalidate } from '../../constants/revalidate'
import { Result } from '../../components/material/result'
import { Item } from '../../interfaces/atlas-academy'
import { serverSideTranslations } from '../../lib/server-side-translations'

export type MaterialResultProps = {
  items: (Item & { largeCategory: string; category: string })[]
}

export const getStaticProps: GetStaticProps<MaterialResultProps> = async ({
  locale,
}) => {
  const [items, translations] = await Promise.all([
    getItems(locale),
    serverSideTranslations(locale),
  ])
  return { props: { items, ...translations }, revalidate }
}

export default Result
