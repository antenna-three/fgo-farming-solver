import Image from 'next/image'
import { Box, Flex, Heading, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from './link'

export const Logo = () => (
  <Box>
    <Link href="/" aria-label="Go to top">
      <HStack align="center">
        <Image
          src="/hermes.png"
          height={32}
          width={32}
          alt="site logo"
          layout="fixed"
        />
        <Heading as="h1">
          <Flex flexWrap="wrap">
            <Box as="span">FGO</Box>
            <Box as="span">周回</Box>
            <Box as="span">ソルバー</Box>
          </Flex>
        </Heading>
      </HStack>
    </Link>
  </Box>
)
