import { GetStaticPaths, GetStaticProps } from 'next'
import { getServants } from '../../lib/get-servants'
import {
  getMaterialsForServants,
  MaterialsForServants,
} from '../../lib/get-materials'
import { revalidate } from '../../constants/revalidate'
import { Material } from '../../components/material/material'
import { Servant } from '../../interfaces/atlas-academy'

export type MaterialProps = {
  servants: Servant[]
  materials: MaterialsForServants
  className: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const servants = await getServants()
  const paths = servants.map(({ className }) => ({ params: { className } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<MaterialProps> = async (
  context
) => {
  const { className } = context.params as { className: string }
  const servants = await getServants()
  const materials = await getMaterialsForServants()
  return { props: { servants, materials, className }, revalidate }
}

export default Material
