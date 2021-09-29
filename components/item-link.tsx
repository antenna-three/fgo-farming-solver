import Link from 'next/link'

type Item = { id: string; name: string }
const itemColors: { [key: string]: string } = {
  0: 'a84',
  1: 'aaa',
  2: 'aa4',
  3: '88a',
  4: 'a88',
  5: 'aa4',
  6: 'aaa',
  7: 'aa4',
}

export default function ItemLink({ item }: { item: Item }) {
  return (
    <>
      <Link href={`/items/${item.id}`}>
        <a className={`item-${item.id}`}>{item.name}</a>
      </Link>
      <style jsx>{`
        .item-${item.id} {
          color: #${itemColors[item.id[0]]};
          font-weight: normal;
        }
      `}</style>
    </>
  )
}
