import {
  Flex,
  HStack,
  Icon,
  IconButton,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { GithubMenu } from './github-menu'
import { Link, ExternalLink } from './link'

export const Footer = (): JSX.Element => (
  <footer>
    <VStack align="center" justify="center">
      <HStack>
        <GithubMenu
          aria-label="Github Repositories"
          icon={<Icon as={FaGithub} boxSize={6} />}
          variant="ghost"
          isRound
        />
        <IconButton
          as="a"
          href="https://twitter.com/antenna_games"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          icon={<Icon as={FaTwitter} boxSize={6} />}
          colorScheme="twitter"
          variant="ghost"
          isRound
        />
      </HStack>
      <HStack wrap="wrap" divider={<StackDivider />}>
        <Text>Copyright 2021 antenna-three</Text>
        <Text>
          Data from{' '}
          <ExternalLink href="https://atlasacademy.io">
            Atlas Academy
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href="https://sites.google.com/view/fgo-domus-aurea">
            FGOアイテム効率劇場
          </ExternalLink>
        </Text>
        <Text>
          Powered by{' '}
          <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> on{' '}
          <ExternalLink href="https://vercel.com">Vercel</ExternalLink>
        </Text>
      </HStack>
    </VStack>
  </footer>
)
