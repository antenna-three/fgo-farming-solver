import { Link } from './link'

type Item = { id: string; name: string }
const itemColors: { [key: string]: string } = {
  0: 'item.bronze',
  1: 'item.silver',
  2: 'item.gold',
  3: 'item.blue',
  4: 'item.red',
  5: 'item.gold',
  6: 'item.silver',
  7: 'item.gold',
}

export const ItemLink = ({ item }: { item: Item }) => (
  <>
    <Link href={`/items/${item.id}`} color={itemColors[item.id[0]]}>
      {item.name}
    </Link>
  </>
)
