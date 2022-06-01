import {
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { GithubMenu } from './github-menu'
import { Link, ExternalLink } from './link'
import { menuGroups } from './nav'

export const Footer = (): JSX.Element => {
  const { locale } = useRouter()
  return (
    <footer>
      <VStack align="center" justify="center">
        <Flex wrap="wrap">
          {menuGroups.map(({ title, items }) => (
            <Stack
              alignSelf="stretch"
              direction={['column', null, 'row']}
              align={['start', null, 'center']}
              divider={<StackDivider />}
              key={title}
              minW={200}
              mx={4}
              my={[4, null, 2]}
            >
              <Heading as="h6" size="xs">
                {title}
              </Heading>
              {items.map(({ href, label }) => (
                <Link href={href} key={href}>
                  {label[(locale ?? 'ja') as 'ja' | 'en']}
                </Link>
              ))}
            </Stack>
          ))}
        </Flex>
        <HStack wrap="wrap" divider={<StackDivider />}>
          <HStack>
            <GithubMenu
              aria-label="Github Repositories"
              icon={<Icon as={FaGithub} boxSize={6} />}
              variant="ghost"
              size="sm"
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
              size="sm"
              isRound
            />
          </HStack>
          <Text>
            <Link href="/LICENSE" color="inherit">
              © 2021 antenna-three
            </Link>
          </Text>
          <Text>
            Data from{' '}
            <ExternalLink href="https://atlasacademy.io" color="inherit">
              Atlas Academy
            </ExternalLink>{' '}
            and{' '}
            <ExternalLink
              href="https://sites.google.com/view/fgo-domus-aurea"
              color="inherit"
            >
              FGOアイテム効率劇場
            </ExternalLink>
          </Text>
        </HStack>
      </VStack>
    </footer>
  )
}
