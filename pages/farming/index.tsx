import { GetStaticProps } from 'next'
import { Head } from '../../components/common/head'
import { ItemForm } from '../../components/farming/item-form'
import { getDrops } from '../../lib/get-drops'
import { Quest } from '../../interfaces/fgodrop'

export const getStaticProps: GetStaticProps = async (context) => {
  const props = await getDrops()

  return {
    props,
    revalidate: 86400,
  }
}

const Index = ({
  items,
  quests,
}: {
  items: { category: string; name: string; id: string }[]
  quests: Quest[]
}) => {
  const description =
    '欲しい素材の数を入力すると、どのフリクエを何周するのが最も効率的かを求めます。'
  return (
    <>
      <Head>
        <meta name="description" content={description} />
      </Head>
      <ItemForm items={items} quests={quests} />
    </>
  )
}
export default Index
