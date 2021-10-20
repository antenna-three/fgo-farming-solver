import { GetStaticProps } from 'next'
import { getServants } from '../../lib/get-servants'
import { getMaterialsForServants } from '../../lib/get-materials'
import { getItems } from '../../lib/get-items'
import { revalidate } from '../../constants/revalidate'
import { Index } from '../../components/material'

export const getStaticProps: GetStaticProps = async (context) => {
  const [servants, materials, items] = await Promise.all([
    getServants(),
    getMaterialsForServants(),
    getItems(),
  ])
  return {
    props: { servants, materials, items },
    revalidate,
  }
}

export default Index
