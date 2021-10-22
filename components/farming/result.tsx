import { useRouter } from 'next/router'
import React from 'react'
import { Container, Heading, Skeleton, Text, VStack } from '@chakra-ui/react'
import { QuestTable } from '../farming/quest-table'
import { TweetIntent } from './tweet-intent'
import { Link } from '../common/link'
import { groupBy } from '../../utils/group-by'
import { ResultStat } from './result-stat'
import { Result } from '../../interfaces/api'
import { ResultAccordion } from './result-accordion'
import { Title } from '../common/title'
import { NextPage } from 'next'

export const Page: NextPage<Result> = ({
  params,
  quests,
  items,
  drop_rates,
  total_ap,
  total_lap,
}) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <VStack>
        <Title>計算結果</Title>
        <Skeleton height="100vh" />
      </VStack>
    )
  }

  if (quests && quests.length == 0) {
    return (
      <>
        <Title>結果が見つかりませんでした</Title>
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
  const lapGroups = groupBy(quests, ({ area }) => area)
  const questToDrops = groupBy(drop_rates, ({ quest_id }) => quest_id)

  return (
    <>
      <VStack spacing="8">
        <Title>計算結果</Title>

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
          <ResultStat totalLap={total_lap} totalAp={total_ap} />
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
          <ResultAccordion items={items} params={params} />
        </Container>

        <Text>
          <Link href="/farming">入力画面に戻る</Link>
        </Text>
      </VStack>
    </>
  )
}
