import { GetStaticProps } from 'next'
import { getServants } from '../../lib/get-servants'
import {
  getMaterialsForServants,
  MaterialsForServants,
} from '../../lib/get-materials'
import { getItems } from '../../lib/get-items'
import { revalidate } from '../../constants/revalidate'
import { Index } from '../../components/material'
import { Item, Servant } from '../../interfaces/atlas-academy'

export type MaterialIndexProps = {
  servants: Servant[]
  materials: MaterialsForServants
  items: Item[]
}

export const getStaticProps: GetStaticProps<MaterialIndexProps> = async ({
  locale,
}) => {
  const [servants, materials, items] = await Promise.all([
    getServants(locale),
    getMaterialsForServants(),
    getItems(locale),
  ])
  return {
    props: { servants, materials, items },
    revalidate,
  }
}

export default Index
