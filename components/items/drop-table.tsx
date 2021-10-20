import { Table, Thead, Tr, Th, Tbody, Td, TableProps } from '@chakra-ui/react'
import React from 'react'
import { DropRate, DropRateKey, Item, Quest } from '../../interfaces/fgodrop'
import { DropRow } from './drop-row'

type DropRateStyle = 'ap' | 'rate'

export const DropTable = ({
  itemIndexes,
  quests,
  dropGroups,
  dropRateKey,
  dropRateStyle,
  ...rest
}: {
  itemIndexes: { [key: string]: Item }
  quests: Quest[]
  dropGroups: { [key: string]: DropRate[] }
  dropRateKey: DropRateKey
  dropRateStyle: DropRateStyle
} & TableProps) => {
  const colSpan =
    Object.values(dropGroups).reduce(
      (acc, cur) => (cur.length > acc ? cur.length : acc),
      0
    ) * 2
  return (
    <Table {...rest}>
      <Thead>
        <Tr>
          <Th>エリア</Th>
          <Th>クエスト</Th>
          <Th isNumeric>サンプル数</Th>
          <Th colSpan={colSpan}>
            ドロップ ({dropRateStyle == 'rate' ? '%' : 'AP/個'})
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {quests.map((quest) => (
          <Tr key={quest.id}>
            <Td>{quest.area}</Td>
            <Td>{quest.name}</Td>
            <Td isNumeric>{quest[`samples_${dropRateKey}`]}</Td>
            {dropGroups[quest.id].map((row) => (
              <DropRow
                key={row.item_id}
                itemIndexes={itemIndexes}
                item_id={row.item_id}
                drop_rate={row[`drop_rate_${dropRateKey}`]}
                dropRateStyle={dropRateStyle}
                ap={quest.ap}
              />
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
