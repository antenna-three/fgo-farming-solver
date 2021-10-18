import { GetServerSideProps } from 'next'
import { getGzip } from '../../lib/get-s3'
import { Result } from '../../components/farming/result'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params == null) return { notFound: true }
  const _params = params as { items: string; quests: string; queries: string }
  const { items, quests, drop_rates } = await getGzip('all.json.gz')
  const props = {
    params: _params.queries
      .split(',')
      .map((p) => p.split(':'))
      .map(([id, count]) => {
        const { category, name } = items.find((i) => i.id == id) as {
          [k: string]: string
        }
        return { id, category, name, count: parseInt(count) }
      }),
    items: _params.items
      .split(',')
      .map((i) => i.split(':'))
      .map(([id, count]) => {
        const { category, name } = items.find((i) => i.id == id) as {
          [k: string]: string
        }
        return { id, category, name, count: parseInt(count) }
      }),
    quests: _params.quests
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

  return { props: { ...props, ..._props } }
}

export default Result
