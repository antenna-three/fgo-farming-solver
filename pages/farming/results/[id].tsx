import { GetServerSideProps } from 'next'
import { DBError } from '../../../lib/dynamodb'
import { Page } from '../../../components/farming/result'
import { getResult } from '../../../lib/get-result'
import { Item, Result } from '../../../interfaces/api'
import { getLocalQuests } from '../../../lib/get-local-quests'
import { getLocalItems, Localized } from '../../../lib/get-local-items'

export type ResultProps = Omit<Result, 'items'> & { items: Localized<Item>[] }

export const getServerSideProps: GetServerSideProps<ResultProps> = async ({
  params,
  locale,
}) => {
  if (typeof params?.id != 'string') {
    return { notFound: true }
  }
  try {
    const { items, quests, ...result } = await getResult(params.id)

    const [localItems, localQuests] = await Promise.all([
      getLocalItems(items, locale),
      getLocalQuests(quests, locale),
    ])
    return {
      props: {
        items: localItems,
        quests: localQuests,
        ...result,
      },
    }
  } catch (e) {
    if (!(e instanceof DBError)) console.log(e)
    return { notFound: true }
  }
}

export default Page
