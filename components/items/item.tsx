import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Center,
  Skeleton,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import React from 'react'
import { useLocalStorage } from '../../hooks/use-local-storage'
import { DropRateKey } from '../../interfaces/fgodrop'
import { ItemProps } from '../../pages/items/[id]'
import { groupBy } from '../../utils/group-by'
import { orderBy } from '../../utils/order-by'
import { Title } from '../common/title'
import { BreadcrumbLink } from '../common/breadcrumb-link'
import { DropRateKeyRadio } from './drop-rate-key-radio'
import { DropRateStyleRadio } from './drop-rate-style-radio'
import { DropTable } from './drop-table'
import { useTranslation } from 'react-i18next'

export type DropRateStyle = 'ap' | 'rate'

export const Page: NextPage<ItemProps> = ({ id, items, quests, dropRates }) => {
  const [dropRateKey, setDropRateKey] = useLocalStorage<DropRateKey>(
    'dropRateKey',
    '1',
    { onGet: (key) => (key == '1' || key == '2' ? key : '1') }
  )
  const [dropRateStyle, setDropRateStyle] = useLocalStorage<DropRateStyle>(
    'dropRateStyle',
    'ap'
  )
  const router = useRouter()
  const { t } = useTranslation('items')
  if (router.isFallback) {
    return <Skeleton height="100vh" />
  }
  const sortedDropRates = dropRates.sort(
    orderBy(
      ({ item_id }) => (item_id == id ? -Infinity : parseInt(item_id, 36)),
      'asc'
    )
  )
  const dropGroups = groupBy(sortedDropRates, ({ quest_id }) => quest_id)
  const idToDropRate = (quest_id: string) =>
    dropGroups[quest_id].find((row) => row.item_id == id)
  const getDropRate = (quest_id: string) => {
    const dropRate = idToDropRate(quest_id)
    return dropRate == null ? -1 : dropRate[`drop_rate_${dropRateKey}`]
  }
  const filteredQuests = quests.filter(({ id }) => getDropRate(id) != -1)
  const selectedQuests =
    dropRateStyle == 'rate'
      ? filteredQuests.sort(orderBy(({ id }) => getDropRate(id), 'desc'))
      : filteredQuests.sort(
          orderBy(({ id, ap }) => ap / getDropRate(id), 'asc')
        )
  const itemIndexes = Object.fromEntries(items.map((item) => [item.id, item]))
  const title = t('title', { name: itemIndexes[id].name })

  return (
    <VStack display="block" spacing={8}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/items">{t('アイテム一覧')}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <Text>{title}</Text>
        </BreadcrumbItem>
      </Breadcrumb>
      <Center>
        <Title>{title}</Title>
      </Center>
      <form>
        <Wrap justify="space-evenly" spacing={8}>
          <WrapItem>
            <DropRateKeyRadio
              dropRateKey={dropRateKey}
              setDropRateKey={setDropRateKey}
            />
          </WrapItem>
          <WrapItem>
            <DropRateStyleRadio
              dropRateStyle={dropRateStyle}
              setDropRateStyle={setDropRateStyle}
            />
          </WrapItem>
        </Wrap>
      </form>
      <Box whiteSpace="nowrap" overflowX="scroll" borderRadius="xl">
        <DropTable
          itemIndexes={itemIndexes}
          quests={selectedQuests}
          dropGroups={dropGroups}
          dropRateKey={dropRateKey}
          dropRateStyle={dropRateStyle}
        />
      </Box>
    </VStack>
  )
}
