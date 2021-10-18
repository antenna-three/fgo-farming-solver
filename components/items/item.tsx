import { Head } from '../common/head'
import { DropTable } from './drop-table'
import { useLocalStorage } from '../../hooks/use-local-storage'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { DropRate, DropRateKey, Item, Quest } from '../../interfaces/fgodrop'
import { useRouter } from 'next/router'
import { BreadcrumbLink } from '../common/breadcrumb-link'
import { groupBy } from '../../lib/group-by'
import { orderBy } from '../../lib/order-by'

type DropRateStyle = 'ap' | 'rate'

export const Page = ({
  id,
  items,
  quests,
  dropRates,
}: {
  id: string
  items: Item[]
  quests: Quest[]
  dropRates: DropRate[]
}) => {
  const [dropRateKey, setDropRateKey] = useLocalStorage<DropRateKey>(
    'dropRateKey',
    '1',
    (key) => (key == '1' || key == '2' ? key : '1')
  )
  const [dropRateStyle, setDropRateStyle] = useLocalStorage<DropRateStyle>(
    'dropRateStyle',
    'ap'
  )
  const router = useRouter()
  if (router.isFallback) {
    return <Skeleton height="100vh" />
  }
  const itemIndexes = Object.fromEntries(items.map((item) => [item.id, item]))
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
    return dropRate == null ? 0 : dropRate[`drop_rate_${dropRateKey}`]
  }
  const selectedQuests =
    dropRateStyle == 'rate'
      ? quests.sort(orderBy(({ id }) => getDropRate(id), 'desc'))
      : quests.sort(orderBy(({ id, ap }) => ap / getDropRate(id), 'asc'))
  const title = itemIndexes[id].name + 'のドロップ一覧'

  return (
    <>
      <Head title={title} />
      <VStack display="block" spacing={8}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/items">アイテム一覧</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Text>{title}</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading>{title}</Heading>
        <form>
          <HStack spacing={8} flexWrap="wrap">
            <Box>
              <FormControl as="fieldset">
                <FormLabel as="legend">ドロップ率</FormLabel>
                <RadioGroup
                  value={dropRateKey}
                  onChange={(value) => {
                    setDropRateKey(value as DropRateKey)
                  }}
                >
                  <HStack>
                    <Radio value="1">旧データ</Radio>
                    <Radio value="2">新データ</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </Box>

            <Box>
              <FormControl as="fieldset">
                <FormLabel as="legend">表示形式</FormLabel>
                <RadioGroup
                  value={dropRateStyle}
                  onChange={(value) => {
                    setDropRateStyle(value as DropRateStyle)
                  }}
                >
                  <HStack>
                    <Radio value="ap">AP効率</Radio>
                    <Radio value="rate">ドロップ率</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </Box>
          </HStack>
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
    </>
  )
}
