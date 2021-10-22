import { Table, Thead, Tr, Th, Tbody, Td, TableProps } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import { DropRate, DropRateKey, Item, Quest } from '../../interfaces/fgodrop'
import { ItemLink } from '../common/item-link'
import { DropTd } from './drop-td'

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
    ) * 3

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
        {quests.map((quest) => {
          const samples = quest[`samples_${dropRateKey}`]
          return (
            <Tr key={quest.id}>
              <Td>{quest.area}</Td>
              <Td>{quest.name}</Td>
              <Td isNumeric>{samples}</Td>
              {dropGroups[quest.id].map((row) => (
                <Fragment key={row.item_id}>
                  <Td pr={0}>
                    <ItemLink item={itemIndexes[row.item_id]} />
                  </Td>
                  <DropTd
                    dropRate={row[`drop_rate_${dropRateKey}`]}
                    dropRateStyle={dropRateStyle}
                    ap={quest.ap}
                    samples={samples}
                  />
                </Fragment>
              ))}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
