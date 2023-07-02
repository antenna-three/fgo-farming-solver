import {
  chakra,
  Heading,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import type { Materials } from '../../interfaces/atlas-academy'
import { toApiItemId } from '../../lib/to-api-item-id'
import { ItemLink } from '../common/item-link'

export const MaterialList = ({ materials }: { materials: Materials }) => {
  const items = Object.values(materials).flatMap(({ items }) =>
    items.map(({ item }) => item)
  )
  return (
    <VStack align="stretch" spacing={8}>
      {Object.entries(materials).map(([lv, materials]) => (
        <VStack align="stretch" key={lv}>
          <Heading size="md">
            <chakra.span fontWeight="normal">Lv.</chakra.span> {lv}
          </Heading>
          <StatGroup borderWidth="thin" borderRadius="md" p={2}>
            {materials.items.map(({ item, amount }) => (
              <Stat key={item.id} mx={2}>
                <StatLabel>
                  <ItemLink id={toApiItemId(item, items)} name={item.name} />
                </StatLabel>
                <StatNumber>{amount}</StatNumber>
              </Stat>
            ))}
          </StatGroup>
        </VStack>
      ))}
    </VStack>
  )
}
