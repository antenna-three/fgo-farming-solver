import { Link, ExternalLink } from './link'
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
        <ExternalLink href="https://twitter.com/antenna_games">
          antenna-three
        </ExternalLink>{' '}
        / Data from{' '}
        <ExternalLink href="https://atlasacademy.io">
          Atlas Academy
        </ExternalLink>{' '}
        and{' '}
        <ExternalLink href="https://sites.google.com/view/fgo-domus-aurea">
          FGOアイテム効率劇場
        </ExternalLink>{' '}
        / Powered by{' '}
        <ExternalLink href="https://vercel.com/">Vercel</ExternalLink>
      </Text>
    </HStack>
  </footer>
)
