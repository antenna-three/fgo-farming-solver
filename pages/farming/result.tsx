import { GetServerSideProps } from 'next'
import { getDrops } from '../../lib/get-drops'
import { Page } from '../../components/farming/result'
import { getLocalItems } from '../../lib/get-local-items'
import { getLocalQuests } from '../../lib/get-local-quests'
import { ResultProps } from './results/[id]'

export const getServerSideProps: GetServerSideProps<ResultProps> = async ({
  query,
  locale,
}) => {
  if (query == null) return { notFound: true }
  const _query = query as { items: string; quests: string; queries: string }
  const { items, quests, drop_rates } = await getDrops()
  const [localItems, localQuests] = await Promise.all([
    getLocalItems(items, locale),
    getLocalQuests(quests, locale),
  ])
  const localItemIndexes = Object.fromEntries(
    localItems.map((item) => [item.id, item])
  )
  const localQuestIndexes = Object.fromEntries(
    localQuests.map((quest) => [quest.id, quest])
  )
  const props = {
    params: {
      items: Object.fromEntries(
        _query.queries.split(',').map((p) => p.split(':'))
      ),
      quests: [],
      objective: '',
    },
    items: _query.items
      .split(',')
      .map((i) => i.split(':'))
      .map(([id, count]) => {
        const item = localItemIndexes[id]
        return { ...item, count: parseInt(count) }
      }),
    quests: _query.quests
      .split(',')
      .map((q) => q.split(':'))
      .map(([id, lap]) => {
        const quest = localQuestIndexes[id]
        return { ...quest, lap: parseInt(lap) }
      }),
    drop_rates: drop_rates.map(
      ({ item_id, quest_id, drop_rate_1, drop_rate_2 }) => ({
        item_id: item_id,
        item_name: localItemIndexes[item_id].name,
        quest_id: quest_id,
        quest_name: localQuestIndexes[quest_id].name,
        drop_rate: drop_rate_1 ?? drop_rate_2 ?? 0,
      })
    ),
  }
  const _props = {
    total_lap: props.quests.reduce((acc, { lap }) => acc + lap, 0),
    total_ap: props.quests.reduce((acc, { ap, lap }) => acc + ap * lap, 0),
  }

  return {
    props: {
      ...props,
      ..._props,
    },
  }
}

export default Page
