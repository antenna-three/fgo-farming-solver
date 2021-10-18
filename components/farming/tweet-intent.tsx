import React from 'react'
import { Box } from '@chakra-ui/layout'
import { FaTwitter } from 'react-icons/fa'
import { orderBy } from '../../lib/order-by'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

export const TweetIntent = ({
  itemCounts,
  questLaps,
  url,
}: {
  itemCounts: { category: string; name: string; id: string; count: number }[]
  questLaps: { area: string; name: string; lap: number }[]
  url: string
}) => {
  const weights: { [key: string]: number } = {
    銅素材: 1,
    銀素材: 3,
    金素材: 5,
    輝石: 0.3,
    魔石: 0.5,
    秘石: 5,
    ピース: 1,
    モニュ: 3,
  }
  const displayedItems = itemCounts
    .slice()
    .sort(orderBy(({ count, category }) => count * weights[category], 'desc'))
    .slice(0, 3)
    .map(({ name, count }) => `${name}${count}個`)
    .join('、')
  const displayedLaps = questLaps
    .slice()
    .sort(orderBy(({ lap }) => lap, 'desc'))
    .slice(0, 3)
    .map(({ area, name, lap }) => `${area} ${name} ${lap}周`)
    .join('\r\n')
  const lapSum = `合計 ${questLaps
    .map(({ lap }) => lap)
    .reduce((acc, cur) => acc + cur, 0)}周`
  const text = `${displayedItems}${
    itemCounts.length > 3 ? 'など' : ''
  }を集めるために必要な周回数:
${displayedLaps}${questLaps.length > 3 ? 'など' : ''}
${questLaps.length > 1 ? lapSum : ''}
詳細: `
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
        結果をツイートする
      </Button>
    </Box>
  )
}
