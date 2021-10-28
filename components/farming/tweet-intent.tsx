import React from 'react'
import { Box } from '@chakra-ui/layout'
import { FaTwitter } from 'react-icons/fa'
import { orderBy } from '../../utils/order-by'
import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const TweetIntent = ({
  itemCounts,
  questLaps,
  url,
}: {
  itemCounts: { category: string; name: string; id: string; count: number }[]
  questLaps: { area: string; name: string; lap: number }[]
  url: string
}) => {
  const { t } = useTranslation('farming')
  const weights = [1, 2, 4, 0.25, 0.75, 4, 1, 2]
  const displayedItems = itemCounts
    .slice()
    .sort(
      orderBy(({ id, count }) => count * weights[parseInt(id?.[0])], 'desc')
    )
    .slice(0, 3)
    .map(({ name, count }) => t('required', { name, count }))
    .join(t('comma'))
  const displayedLaps = questLaps
    .slice()
    .sort(orderBy(({ lap }) => lap, 'desc'))
    .slice(0, 3)
    .map(({ area, name, lap }) => t('runs', { area, name, lap }))
    .join('\r\n')
  const total = t('total', {
    lap: questLaps.map(({ lap }) => lap).reduce((acc, cur) => acc + cur, 0),
  })
  const iaso = itemCounts.length > 3 ? t('and-so-on') : ''
  const qaso = questLaps.length > 3 ? t('and-so-on') : ''
  const text = t('text', {
    items: displayedItems,
    iaso,
    quests: displayedLaps,
    qaso,
    total,
  })
  const hashtags = 'FGO周回ソルバー'
  const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`

  return (
    <Box my={4}>
      <Button
        as="a"
        href={intentUrl}
        target="_blank"
        rel="noopener noreferrer"
        leftIcon={<FaTwitter />}
        colorScheme="twitter"
        variant="solid"
        p={2}
      >
        {t('結果をツイートする')}
      </Button>
    </Box>
  )
}
