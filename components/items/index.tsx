import { NextPage } from 'next'
import React from 'react'
import {
  Heading,
  HStack,
  VStack,
  Text,
  Wrap,
  WrapItem,
  Center,
} from '@chakra-ui/react'
import { getLargeCategory } from '../../hooks/get-large-category'
import { ItemProps } from '../../pages/items/[id]'
import { groupBy } from '../../utils/group-by'
import { Title } from '../common/title'
import { ItemLink } from '../common/item-link'

export const Index: NextPage<ItemProps> = ({ items }) => {
  const itemGroups = Object.entries(groupBy(items, ({ category }) => category))
  const largeItemGroups = Object.entries(
    groupBy(itemGroups, ([category]) => getLargeCategory(category))
  )

  return (
    <VStack spacing={10} align="stretch">
      <Center>
        <Title>アイテム一覧</Title>
      </Center>
      <Wrap spacing={10} justify="space-around">
        {largeItemGroups.map(([largeCategory, largeGroup]) => (
          <WrapItem key={largeCategory}>
            <VStack align="start">
              <Heading size="md">{largeCategory}</Heading>
              <HStack align="start" spacing={10}>
                {largeGroup.map(([category, group]) => (
                  <VStack align="start" key={category}>
                    <Heading as="h3" size="sm">
                      {category}
                    </Heading>
                    {group.map((item) => (
                      <Text key={item.id}>
                        <ItemLink item={item} />
                      </Text>
                    ))}
                  </VStack>
                ))}
              </HStack>
            </VStack>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  )
}
