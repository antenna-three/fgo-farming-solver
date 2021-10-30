import React from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/table'
import { DropRate, Item } from '../../interfaces/api'
import { ItemLink } from '../common/item-link'

export const QuestItemTable = ({
  dropRates,
  itemIndexes,
  lap,
}: {
  dropRates: DropRate[]
  itemIndexes: { [id: string]: Item }
  lap: number
}) => {
  const { t } = useTranslation('farming')
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>{t('アイテム')}</Th>
          <Th isNumeric>{t('獲得数')}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {dropRates.map(({ item_id, drop_rate }) => (
          <Tr key={item_id}>
            <Td>
              <ItemLink id={item_id} name={itemIndexes[item_id]?.name} />
            </Td>
            <Td isNumeric>
              {Math.round(
                (typeof drop_rate == 'string'
                  ? parseFloat(drop_rate)
                  : drop_rate) * lap
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
