import { Link } from './link'
import { HStack, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { FaGithub } from 'react-icons/fa'

export const Footer = (): JSX.Element => (
  <footer>
    <HStack alignItems="center">
      <Link href="/repos" color="gray.800">
        <Icon as={FaGithub} />
      </Link>
      <Text>
        Copyright 2021{' '}
        <Link href="https://twitter.com/antenna_games">antenna-three</Link> /
        Data from <Link href="https://atlasacademy.io">Atlas Academy</Link> and{' '}
        <Link href="https://sites.google.com/view/fgo-domus-aurea">
          FGOアイテム効率劇場
        </Link>
      </Text>
    </HStack>
  </footer>
)
