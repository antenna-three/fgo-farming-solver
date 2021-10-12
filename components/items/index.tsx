import { Head } from '../../components/common/head'
import _ from 'lodash'
import { ItemLink } from '../../components/common/item-link'
import { getLargeCategory } from '../../lib/get-large-category'
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
import { Item } from '../../interfaces/fgodrop'

export const Index = ({ items }: { items: Item[] }) => {
  const itemGroups = Object.entries(
    _.groupBy(items, ({ category }) => category)
  )
  const largeItemGroups = Object.entries(
    _.groupBy(itemGroups, ([category, group]) => getLargeCategory(category))
  )
  const title = 'アイテム一覧'

  return (
    <>
      <Head title={title} />
      <VStack spacing={10} align="stretch">
        <Center>
          <Heading>{title}</Heading>
        </Center>
        <Wrap spacing={10} justify="space-around">
          {largeItemGroups.map(([largeCategory, largeGroup]) => (
            <WrapItem key={largeCategory}>
              <VStack align="start">
                <Heading size="md">{largeCategory}</Heading>
                <HStack align="start" spacing={10}>
                  {largeGroup.map(([category, group]) => (
                    <VStack align="start" key={category}>
                      <Heading as="h3" size="md">
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
    </>
  )
}
