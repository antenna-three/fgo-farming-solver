import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next'
import { DBError } from '../../../lib/dynamodb'
import { Page } from '../../../components/farming/result'
import { getResult } from '../../../lib/get-result'
import { Item, Result } from '../../../interfaces/api'
import { serverSideTranslations } from '../../../lib/server-side-translations'
import { getLocalQuests } from '../../../lib/get-local-quests'
import { getLocalItems, Localized } from '../../../lib/get-local-items'

export type ResultProps = Omit<Result, 'items'> & { items: Localized<Item>[] }

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export const getStaticProps: GetStaticProps<ResultProps> = async ({
  params,
  locale,
}) => {
  if (typeof params?.id !== 'string') {
    return { notFound: true }
  }
  try {
    const [{ items, quests, ...result }, translations] = await Promise.all([
      getResult(params.id),
      serverSideTranslations(locale),
    ])
    const [localItems, localQuests] = await Promise.all([
      getLocalItems(items, locale),
      getLocalQuests(quests, locale),
    ])
    return {
      props: {
        items: localItems,
        quests: localQuests,
        ...result,
        ...translations,
      },
    }
  } catch (e) {
    if (!(e instanceof DBError)) console.log(e)
    return { notFound: true }
  }
}

export default Page
