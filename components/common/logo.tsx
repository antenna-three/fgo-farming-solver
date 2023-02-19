import Image from 'next/image'
import { Box, Flex, Heading, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from './link'
import { useRouter } from 'next/router'

export const Logo = () => {
  const { locale } = useRouter()
  const space = locale == 'en' ? '\u2009' : ''
  return (
    <Box>
      <Link href="/" aria-label="Go to top">
        <HStack align="center">
          <Image src="/hermes.png" width={32} height={32} alt="site logo" />
          <Heading as="h1">
            <Flex flexWrap="wrap">
              <Box as="span">FGO{space}</Box>
              <Box as="span">
                {locale == 'en' ? 'Farming' : '周回'}
                {space}
              </Box>
              <Box as="span">{locale == 'en' ? 'Solver' : 'ソルバー'}</Box>
            </Flex>
          </Heading>
        </HStack>
      </Link>
    </Box>
  )
}
