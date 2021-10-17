import { useRouter } from 'next/router'
import React, { FormEventHandler, useState } from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Container,
  Grid,
  Heading,
  SimpleGrid,
  Skeleton,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@chakra-ui/react'
import _ from 'lodash'
import { getLargeCategory } from '../../lib/get-large-category'
import { Head } from '../common/head'
import Spinner from '../common/spinner'
import { QuestTable } from '../farming/quest-table'
import { SumTable } from './sum-table'
import { TweetIntent } from './tweet-intent'
import { ItemTable } from './item-table'
import { Link } from '../common/link'

type Params = {
  objective: string
  items: { [key: string]: number }
  quests: string[]
}
type Quest = {
  id: string
  section: string
  area: string
  name: string
  lap: number
}
type Item = { id: string; category: string; name: string; count: number }
type DropRate = {
  quest_id: string
  quest_name: string
  item_id: string
  item_name: string
  drop_rate: number
}

export const Result = ({
  params,
  quests,
  items,
  drop_rates,
  total_ap,
  total_lap,
}: {
  params: Params
  quests: Quest[]
  items: Item[]
  drop_rates: DropRate[]
  total_lap: number
  total_ap: number
}) => {
  const router = useRouter()
  const [showSum, setShowSum] = useState(false)

  if (router.isFallback) {
    return <Spinner message={'読み込み中'} />
  }

  if (quests && quests.length == 0) {
    return (
      <>
        <Heading>結果が見つかりませんでした</Heading>
        <Text>
          新しく追加された素材のためドロップ率のデータがない場合などがあります。
        </Text>
        <Text>
          <Link href="/">トップに戻る</Link>
        </Text>
      </>
    )
  }

  const itemIndexes = Object.fromEntries(items.map((item) => [item.id, item]))
  const paramItems = Object.entries(params.items).map(([id, count]) => ({
    ...itemIndexes[id],
    count,
  }))
  const lapGroups = _.groupBy(quests, 'area')
  const itemGroups = _.groupBy(items, 'category')
  const largeItemGroups = _.groupBy(
    Object.entries(itemGroups),
    ([category, _]) => getLargeCategory(category)
  )
  const questToDrops = _.groupBy(drop_rates, 'quest_id')

  const handleChange: FormEventHandler<HTMLInputElement> = (event) => {
    const { checked } = event.currentTarget
    setShowSum(checked)
  }

  return (
    <>
      <Head title="計算結果" />
      <VStack spacing="8">
        <Heading as="h1">計算結果</Heading>

        <Heading size="lg">クエスト周回数</Heading>

        <Container maxW="sm">
          <QuestTable
            questGroups={lapGroups}
            questToDrops={questToDrops}
            itemIndexes={itemIndexes}
          />
        </Container>

        <VStack>
          <Heading as="h3" size="md">
            合計
          </Heading>
          <Checkbox isChecked={showSum} onChange={handleChange}>
            表示
          </Checkbox>
          <StatGroup>
            {[
              { label: '周回数', value: total_lap },
              { label: 'AP', value: total_ap },
              { label: '聖晶石', value: Math.round(total_ap / 144) },
              {
                label: '費用',
                value: '¥' + Math.round((total_ap / 144 / 168) * 10000),
              },
            ].map(({ label, value }) => (
              <Stat flexWrap="wrap" key={label} m={5}>
                <StatLabel>{label}</StatLabel>
                <Skeleton h="32px" isLoaded={showSum} fadeDuration={1}>
                  <StatNumber>{value}</StatNumber>
                </Skeleton>
              </Stat>
            ))}
          </StatGroup>
        </VStack>

        <TweetIntent
          itemCounts={paramItems}
          questLaps={quests}
          url={`${
            process.env.VERCEL_URL || 'https://fgo-farming-solver.vercel.app'
          }${router.asPath}`}
        />

        <Heading size="lg" mb={4}>
          アイテム獲得数
        </Heading>
        <Container maxW="container.xl">
          <Accordion allowMultiple>
            {Object.entries(largeItemGroups).map(
              ([largeCategory, itemGroups]) => (
                <AccordionItem className="item-details" key={largeCategory}>
                  <h3>
                    <AccordionButton>
                      <AccordionIcon />
                      {largeCategory}
                    </AccordionButton>
                  </h3>
                  <AccordionPanel>
                    <ItemTable
                      itemGroups={itemGroups}
                      itemToQuery={params.items}
                    />
                  </AccordionPanel>
                </AccordionItem>
              )
            )}
          </Accordion>
        </Container>

        <Text>
          <Link href="/farming">入力画面に戻る</Link>
        </Text>
      </VStack>
    </>
  )
}
