import { Td } from '@chakra-ui/table'
import React from 'react'
import { ItemLink } from '../common/item-link'

export const DropRow = ({
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
}) => (
  <>
    <Td pr={0}>
      <ItemLink item={itemIndexes[item_id]} />
    </Td>
    <Td isNumeric>
      {!drop_rate
        ? '-'
        : dropRateStyle == 'rate'
        ? (drop_rate * 100).toFixed(1)
        : (ap / drop_rate).toFixed(1)}
    </Td>
  </>
)
