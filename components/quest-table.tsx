import { Fragment } from 'react'
import ItemLink from './item-link'

export default function QuestTable({
  questGroups,
  questToDrops,
  itemIndexes,
}: {
  questGroups: {
    [key: string]: { area: string; name: string; id: string; lap: number }[]
  }
  questToDrops: {
    [key: string]: { item_id: string; drop_rate: number | string }[]
  }
  itemIndexes: { [key: string]: { id: string; name: string } }
}) {
  const colSpan =
    Object.values(questToDrops).reduce(
      (acc, cur) => (cur.length > acc ? cur.length : acc),
      0
    ) * 2
  return (
    <table>
      <thead>
        <tr>
          <th key="quest-header" className="left">
            クエスト
          </th>
          <th key="lap-header" className="right">
            周回数
          </th>
          <th key="drop-header" className="left" colSpan={colSpan}>
            ドロップ
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(questGroups).map(([area, questGroup]) => (
          <Fragment key={area}>
            <tr key={area}>
              <th className="left" colSpan={colSpan + 2}>
                {area}
              </th>
            </tr>
            {questGroup.map(({ name, id, lap }) => (
              <tr key={id}>
                <td className="left">{name}</td>
                <td className="right">{lap}</td>
                {questToDrops[id].map((d) => (
                  <Fragment key={id + d.item_id}>
                    <td className="left item-name">
                      <ItemLink item={itemIndexes[d.item_id]} />
                    </td>
                    <td className="right item-count">
                      {Math.round(
                        (typeof d.drop_rate == 'string'
                          ? parseFloat(d.drop_rate)
                          : d.drop_rate) * lap
                      )}
                    </td>
                  </Fragment>
                ))}
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
      <style jsx>{`
        .item-name {
          padding-right: 0;
          text-align: center;
        }
        .item-count {
          padding-left: 0.2rem;
        }
      `}</style>
    </table>
  )
}
