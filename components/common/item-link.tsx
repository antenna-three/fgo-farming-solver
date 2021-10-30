import { Link } from './link'

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

export const ItemLink = ({ id, name }: { id: string; name: string }) => (
  <Link href={`/items/${id}`} color={itemColors[id[0]]}>
    {name}
  </Link>
)
