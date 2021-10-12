import {
  VStack,
  Heading,
  StatNumber,
  Stat,
  StatGroup,
  StatLabel,
} from '@chakra-ui/react'
import React from 'react'
import type { Materials } from '../../interfaces/atlas-academy'

export const MaterialList = ({ materials }: { materials: Materials }) => (
  <>
    {Object.entries(materials).map(([lv, materials]) => (
      <VStack align="stretch" key={lv}>
        <Heading size="md">Lv. {lv}</Heading>
        <StatGroup borderWidth="thin" borderRadius="md" p={4} w="xs">
          {materials.items.map(({ item, amount }) => (
            <Stat key={item.id}>
              <StatLabel>{item.name}</StatLabel>
              <StatNumber>{amount}</StatNumber>
            </Stat>
          ))}
        </StatGroup>
      </VStack>
    ))}
  </>
)
