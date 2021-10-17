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
import { ItemLink } from '../common/item-link'

export const ItemTable = ({
  itemGroups,
  itemToQuery,
}: {
  itemGroups: [string, { name: string; count: number; id: string }[]][]
  itemToQuery: { [key: string]: number }
}) => (
  <Wrap align="start" justify="space-between">
    {itemGroups.map(([category, itemGroup]) => (
      <VStack align="start" key={category}>
        <Heading size="md">{category}</Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>アイテム</Th>
              <Th isNumeric>獲得数</Th>
              <Th isNumeric>必要数</Th>
            </Tr>
          </Thead>
          <Tbody>
            {itemGroup.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <ItemLink item={item} />
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
