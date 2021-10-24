import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  HStack,
  Box,
  Wrap,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Item } from '../../interfaces/api'
import { Localized } from '../../lib/get-local-items'
import { ItemLink } from '../common/item-link'

export const ItemTable = ({
  itemGroups,
  itemToQuery,
}: {
  itemGroups: [string, Localized<Item>[]][]
  itemToQuery: { [key: string]: number }
}) => {
  const { t } = useTranslation('farming')
  return (
    <Wrap align="start" justify="space-between">
      {itemGroups.map(([category, items]) => (
        <VStack align="start" key={category}>
          <Heading size="md">{category}</Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>{t('アイテム')}</Th>
                <Th isNumeric>{t('獲得数')}</Th>
                <Th isNumeric>{t('必要数')}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item) => (
                <Tr key={item.id}>
                  <Td>
                    <ItemLink id={item.id} name={item.name} />
                  </Td>
                  <Td isNumeric>{item.count}</Td>
                  <Td isNumeric>{itemToQuery[item.id] || '-'}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
      ))}
    </Wrap>
  )
}
