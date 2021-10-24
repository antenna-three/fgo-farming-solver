import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getServants } from '../../lib/get-servants'
import {
  getMaterialsForServants,
  MaterialsForServants,
} from '../../lib/get-materials'
import { revalidate } from '../../constants/revalidate'
import { Material } from '../../components/material/material'
import { Servant } from '../../interfaces/atlas-academy'
import { serverSideTranslations } from '../../lib/server-side-translations'

export type MaterialProps = {
  servants: Servant[]
  materials: MaterialsForServants
  className: string
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const servants = await getServants()
  const classNames = Array.from(
    new Set<string>(servants.map(({ className }) => className))
  )
  const paths = classNames.flatMap((className) =>
    (locales ?? ['ja']).map((locale) => ({ params: { className }, locale }))
  )
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<MaterialProps> = async ({
  params,
  locale,
}) => {
  if (typeof params?.className != 'string') return { notFound: true }
  const { className } = params
  const [servants, materials, translations] = await Promise.all([
    getServants(locale),
    getMaterialsForServants(),
    serverSideTranslations(locale),
  ])
  return {
    props: { servants, materials, className, ...translations },
    revalidate,
  }
}

export default Material
