import { GetStaticPaths, GetStaticProps } from 'next'
import { getServants } from '../../lib/get-servants'
import { getMaterialsForServants } from '../../lib/get-materials'
import { revalidate } from '../../constants/revalidate'
import { Material } from '../../components/material/material'

export const getStaticPaths: GetStaticPaths = async () => {
  const servants = await getServants()
  const paths = servants.map(({ className }) => ({ params: { className } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { className } = context.params as { className: string }
  const servants = await getServants()
  const materials = await getMaterialsForServants()
  return { props: { servants, materials, className }, revalidate }
}

export default Material
