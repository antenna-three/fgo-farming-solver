import { GetServerSideProps } from 'next'
import _ from 'lodash'
import { getS3 } from '../../lib/get-s3'
import { Result } from '../../components/farming/result'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemsPromise = getS3('items_2021.csv')
  const questsPromise = getS3('quests_2021.csv')
  const dropsPromise = getS3('drop_rates_2021.csv')
  const [items, quests, drops] = await Promise.all([
    itemsPromise,
    questsPromise,
    dropsPromise,
  ])

  const itemIndex = Object.fromEntries(items.map((item) => [item.id, item]))
  const questIndex = Object.fromEntries(
    quests.map((quest) => [quest.id, quest])
  )
  const questToDrops = _.groupBy(drops, 'quest_id')

  return {
    props: { itemIndex, questIndex, questToDrops },
  }
}

export default Result
