import { GetServerSidePropsContext } from 'next'
import { getDrops } from '../../lib/get-drops'
import { Page } from '../../components/farming/result'
import { serverSideTranslations } from '../../lib/server-side-translations'
import { getLocalItems } from '../../lib/get-local-items'
import { getLocalQuests } from '../../lib/get-local-quests'

export const getServerSideProps = async ({
  query,
  locale,
}: GetServerSidePropsContext) => {
  if (query == null) return { notFound: true }
  const _query = query as { items: string; quests: string; queries: string }
  const [{ items, quests, drop_rates }, translations] = await Promise.all([
    getDrops(),
    serverSideTranslations(locale),
  ])
  const [localItems, localQuests] = await Promise.all([
    getLocalItems(items, locale),
    getLocalQuests(quests, locale),
  ])
  const props = {
    params: {
      items: _query.queries
        .split(',')
        .map((p) => p.split(':'))
        .map(([id, count]) => {
          const { category, name } = items.find((i) => i.id == id) as {
            [k: string]: string
          }
          return { id, category, name, count: parseInt(count) }
        }),
    },
    items: _query.items
      .split(',')
      .map((i) => i.split(':'))
      .map(([id, count]) => {
        const { category, name } = items.find((i) => i.id == id) as {
          [k: string]: string
        }
        return { id, category, name, count: parseInt(count) }
      }),
    quests: _query.quests
      .split(',')
      .map((q) => q.split(':'))
      .map(([id, lap]) => {
        const { section, area, name, ap } = quests.find((q) => q.id == id) as {
          ap: number
          section: string
          area: string
          name: string
        }
        return { id, section, area, name, ap, lap: parseInt(lap) }
      }),
    drop_rates,
  }
  const _props = {
    total_lap: props.quests.reduce((acc, { lap }) => acc + lap, 0),
    total_ap: props.quests.reduce((acc, { ap, lap }) => acc + ap * lap, 0),
  }

  return {
    props: {
      items: localItems,
      quests: localQuests,
      drop_rates,
      ..._props,
      ...translations,
    },
  }
}

export default Page
