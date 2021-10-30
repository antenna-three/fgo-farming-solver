import React from 'react'
import { Box } from '@chakra-ui/layout'
import { FaTwitter } from 'react-icons/fa'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

export const TweetIntent = ({ text }: { text: string }) => {
  const router = useRouter()
  const url = `https://${
    process.env.NEXT_PUBLIC_VERCEL_URL ?? 'fgo-farming-solver.vercel.com'
  }${router.pathname}`
  const hashtags = 'FGO周回ソルバー'
  const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`
  const { t } = useTranslation('farming')

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
