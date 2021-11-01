import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import {
  Center,
  Container,
  Heading,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { ResultProps } from '../../pages/farming/results/[id]'
import { useFarmingResult } from '../../hooks/use-farming-result'
import { Title } from '../common/title'
import { Link } from '../common/link'
import { QuestTable } from './quest-table'
import { TweetIntent } from './tweet-intent'
import { ResultStat } from './result-stat'
import { ResultAccordion } from './result-accordion'

export const Page: NextPage<ResultProps> = ({
  params,
  quests,
  items,
  drop_rates,
  total_ap,
  total_lap,
}) => {
  const router = useRouter()
  const { t } = useTranslation(['farming', 'common'])
  const text = useFarmingResult(items, params.items, quests)

  if (router.isFallback) {
    return (
      <VStack>
        <Title>{t('計算結果')}</Title>
        <Skeleton height="100vh" />
      </VStack>
    )
  }

  if (quests && quests.length == 0) {
    return (
      <>
        <Title>{t('結果が見つかりませんでした')}</Title>
        <Text>
          {t(
            '新しく追加された素材のためドロップ率のデータがない場合などがあります。'
          )}
        </Text>
        <Text>
          <Link href="/">{t('トップに戻る', { ns: 'common' })}</Link>
        </Text>
      </>
    )
  }

  return (
    <>
      <VStack spacing="8">
        <Title>{t('計算結果')}</Title>

        <Heading size="lg">{t('クエスト周回数')}</Heading>

        <Center w="sm">
          <QuestTable items={items} quests={quests} dropRates={drop_rates} />
        </Center>

        <VStack>
          <Heading as="h3" size="md">
            {t('合計')}
          </Heading>
          <ResultStat totalLap={total_lap} totalAp={total_ap} />
        </VStack>

        <TweetIntent text={text} />

        <Heading size="lg">{t('アイテム獲得数')}</Heading>

        <Container maxW="container.xl">
          <ResultAccordion items={items} params={params} />
        </Container>
      </VStack>
    </>
  )
}
