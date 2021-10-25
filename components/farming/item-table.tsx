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
                <Th px={4}>{t('アイテム')}</Th>
                <Th px={2} isNumeric>
                  {t('獲得数')}
                </Th>
                <Th px={4} isNumeric>
                  {t('必要数')}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item) => (
                <Tr key={item.id}>
                  <Td px={4}>
                    <ItemLink id={item.id} name={item.name} />
                  </Td>
                  <Td px={2} isNumeric>
                    {item.count}
                  </Td>
                  <Td px={4} isNumeric>
                    {itemToQuery[item.id] || '-'}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
      ))}
    </Wrap>
  )
}
