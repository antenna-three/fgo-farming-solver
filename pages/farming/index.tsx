import { Head } from '../../components/common/head'
import { ItemForm } from '../../components/farming/item-form'
import { Drops, getDrops } from '../../lib/get-drops'
import { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps<Drops> = async () => {
  const props = await getDrops()

  return {
    props,
    revalidate: 86400,
  }
}

const Index: NextPage<Drops> = ({ items, quests }) => {
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
