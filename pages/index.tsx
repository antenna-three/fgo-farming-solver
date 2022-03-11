import NextLink from 'next/link'
import {
  Heading,
  chakra,
  VStack,
  Box,
  ChakraComponent,
  Text,
  LinkProps as ChakraLinkProps,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { motion, TargetAndTransition, Transition } from 'framer-motion'
import { Link, LinkProps } from '../components/common/link'
import { theme } from '../theme'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Trans, useTranslation } from 'react-i18next'
import { useLocalStorage } from '../hooks/use-local-storage'

const MotionSpan = motion<any>(chakra.span)

const NoWrap: ChakraComponent<'span', {}> = ({ children, ...props }) => (
  <chakra.span whiteSpace="nowrap" {...props}>
    {children}
  </chakra.span>
)

const Card: ChakraComponent<'div', {}> = ({ children, ...props }) => (
  <Box p={5} h="100%" borderWidth="thin" rounded="lg" {...props}>
    <VStack spacing={5} align="start">
      {children}
    </VStack>
  </Box>
)

const LinkCard: ChakraComponent<'div', LinkProps> = ({
  href,
  children,
  ...props
}) => (
  <NextLink href={href}>
    <a>
      <Card _hover={{ boxShadow: 'lg' }} {...props}>
        {children}
      </Card>
    </a>
  </NextLink>
)

const ExternalLinkCard: ChakraComponent<'div', ChakraLinkProps> = ({
  href,
  children,
  ...props
}) => (
  <a href={href} target="_blank" rel="noopenner noreferrer">
    <Card _hover={{ boxShadow: 'lg' }} {...props}>
      {children}
    </Card>
  </a>
)

const gray = theme.colors.gray[800]
const blue = theme.colors.blue[500]
const green = theme.colors.green[500]
const orange = theme.colors.orange[500]

const blueAnimate: TargetAndTransition = { color: [gray, blue, blue, gray] }
const greenAnimate: TargetAndTransition = { color: [gray, green, green, gray] }
const orangeAnimate: TargetAndTransition = {
  color: [gray, orange, orange, gray],
}

const transition: Transition = {
  ease: 'easeInOut',
  repeat: Infinity,
  repeatDelay: 4,
  repeatType: 'loop',
  times: [0, 0.2, 0.5, 0.7],
  duration: 4,
}

const Index = () => {
  const { t } = useTranslation('common')
  const farmingResultUrl =
    typeof window == 'undefined'
      ? ''
      : localStorage.getItem('farming/results')?.replace(/"/g, '')
  const materialResultExists =
    typeof window == 'undefined' ? false : 'material/result' in localStorage

  return (
    <VStack spacing={12} mt={12}>
      <VStack textAlign="center">
        <Trans
          t={t}
          i18nKey="title"
          components={{
            h: <Heading as="h1" size="xl" />,
            nw: <NoWrap />,
            s: <NoWrap fontSize="0.8em" />,
            m1: (
              <MotionSpan
                animate={blueAnimate}
                transition={{ ...transition, delay: 0 }}
              />
            ),
            m2: (
              <MotionSpan
                animate={greenAnimate}
                transition={{ ...transition, delay: 2 }}
              />
            ),
            m3: (
              <MotionSpan
                animate={greenAnimate}
                transition={{ ...transition, delay: 4 }}
              />
            ),
            m4: (
              <MotionSpan
                animate={orangeAnimate}
                transition={{ ...transition, delay: 6 }}
              />
            ),
          }}
        />
      </VStack>
      <SimpleGrid minChildWidth="250px" spacing={4} alignItems="stretch">
        <GridItem>
          <LinkCard href="/material">
            <Heading size="lg">{t('育成素材計算機')}</Heading>
            <Text>{t('material-calculator-description')}</Text>
            {materialResultExists && (
              <Link href="/material/result">{t('前回の結果')}</Link>
            )}
          </LinkCard>
        </GridItem>

        <GridItem>
          <LinkCard href="/farming">
            <Heading size="lg">{t('周回ソルバー')}</Heading>
            <Text>{t('farming-solver-description')}</Text>
            {farmingResultUrl && (
              <Link href={farmingResultUrl}>{t('前回の結果')}</Link>
            )}
          </LinkCard>
        </GridItem>

        <GridItem>
          <LinkCard href="/servants">
            <Heading size="lg">{t('サーヴァント一覧')}</Heading>
            <Text>{t('servant-list-description')}</Text>
          </LinkCard>
        </GridItem>

        <GridItem>
          <LinkCard href="/items">
            <Heading size="lg">{t('アイテム一覧')}</Heading>
            <Text>{t('item-list-description')}</Text>
          </LinkCard>
        </GridItem>

        <GridItem>
          <LinkCard href="/cloud">
            <Heading size="lg">{t('クラウドセーブ')}</Heading>
            <Text>{t('cloud-description')}</Text>
          </LinkCard>
        </GridItem>

        <GridItem>
          <ExternalLinkCard
            href={`https://twitter.com/search?q=${encodeURIComponent(
              '#FGO周回ソルバー'
            )}`}
          >
            <Heading size="lg">
              {t('みんなの結果')}
              <ExternalLinkIcon mx={2} />
            </Heading>
            <Text>{t('shared-results-description')}</Text>
          </ExternalLinkCard>
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}

export default Index
