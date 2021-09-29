import DropRow from './drop-row'

type Item = { id: string; name: string }
type Quest = {
  id: string
  section: string
  area: string
  name: string
  ap: number
}
type DropRate = {
  item_id: string
  quest_id: string
  drop_rate_1: number
  drop_rate_2: number
}

export default function DropTable({
  itemIndexes,
  quests,
  dropGroups,
  dropRateKey,
  dropRateStyle,
}: {
  itemIndexes: { [key: string]: Item }
  quests: Quest[]
  dropGroups: { [key: string]: DropRate[] }
  dropRateKey: 'drop_rate_1' | 'drop_rate_2'
  dropRateStyle: 'ap' | 'rate'
}) {
  const colSpan =
    Object.values(dropGroups).reduce(
      (acc, cur) => (cur.length > acc ? cur.length : acc),
      0
    ) * 2
  return (
    <table>
      <thead>
        <tr>
          <th>エリア</th>
          <th>クエスト</th>
          <th colSpan={colSpan}>
            ドロップ ({dropRateStyle == 'rate' ? '%' : 'AP/個'})
          </th>
        </tr>
      </thead>
      <tbody>
        {quests.map((quest) => (
          <tr key={quest.id}>
            <td>{quest.area}</td>
            <td>{quest.name}</td>
            {dropGroups[quest.id].map((row) => (
              <DropRow
                key={row.item_id}
                itemIndexes={itemIndexes}
                item_id={row.item_id}
                drop_rate={row[dropRateKey]}
                dropRateStyle={dropRateStyle}
                ap={quest.ap}
              />
            ))}
          </tr>
        ))}
      </tbody>
      <style jsx>{`
        th,
        td {
          text-align: left;
        }
        td {
          padding-right: 0.5rem;
        }
      `}</style>
    </table>
  )
}
