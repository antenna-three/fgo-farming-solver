import { GetStaticProps } from 'next'
import { Head } from '../../components/common/head'
import { ItemForm } from '../../components/farming/item-form'
import { Text } from '@chakra-ui/layout'
import { getGzip } from '../../lib/get-s3'
import { Quest } from '../../interfaces/fgodrop'

export const getStaticProps: GetStaticProps = async (context) => {
  const props = await getGzip('all.json.gz')

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
      <Text my={4}>{description}</Text>
      <ItemForm items={items} quests={quests} />
    </>
  )
}
export default Index
