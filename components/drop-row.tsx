import ItemLink from './item-link'

export default function DropRow({
  itemIndexes,
  item_id,
  drop_rate,
  dropRateStyle,
  ap,
}: {
  itemIndexes: { [key: string]: { id: string; name: string } }
  item_id: string
  drop_rate: number
  dropRateStyle: 'ap' | 'rate'
  ap: number
}) {
  return (
    <>
      <td className="item-name">
        <ItemLink item={itemIndexes[item_id]} />
      </td>
      <td className="drop-rate">
        {!drop_rate
          ? '-'
          : dropRateStyle == 'rate'
          ? (drop_rate * 100).toFixed(1)
          : (ap / drop_rate).toFixed(1)}
      </td>
      <style jsx>{`
        td {
          padding-right: 0.2rem;
        }
        .drop-rate {
          text-align: right;
          padding-left: 0;
        }
      `}</style>
    </>
  )
}
