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
import { groupBy } from '../../utils/group-by'
import { Title } from '../common/title'
import { ItemLink } from '../common/item-link'
import { useTranslation } from 'react-i18next'
import { ItemIndexProps } from '../../pages/items'
import { Item } from '../../interfaces/fgodrop'
import { Localized } from '../../lib/get-local-items'

export const Index: NextPage<ItemIndexProps> = ({ items }) => {
  const itemGroups = Object.entries(
    groupBy(items, ({ largeCategory }) => largeCategory)
  ).map(([largeCategory, items]): [string, [string, Localized<Item>[]][]] => [
    largeCategory,
    Object.entries(groupBy(items, ({ category }) => category)),
  ])
  const { t } = useTranslation('items')

  return (
    <VStack spacing={10} align="stretch">
      <Center>
        <Title>{t('アイテム一覧')}</Title>
      </Center>
      <Wrap spacing={10} justify="space-around">
        {itemGroups.map(([largeCategory, itemGroup]) => (
          <WrapItem key={largeCategory}>
            <VStack align="start">
              <Heading size="md">{largeCategory}</Heading>
              <HStack align="start" spacing={10}>
                {itemGroup.map(([category, items]) => (
                  <VStack align="start" key={category}>
                    <Heading as="h3" size="sm">
                      {category}
                    </Heading>
                    {items.map((item) => (
                      <Text key={item.id}>
                        <ItemLink id={item.id} name={item.name} />
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
