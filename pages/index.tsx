import NextLink from 'next/link'
import {
  Heading,
  chakra,
  VStack,
  Box,
  ChakraComponent,
  Text,
  LinkProps as ChakraLinkProps,
  Wrap,
} from '@chakra-ui/react'
import React from 'react'
import { motion, TargetAndTransition, Transition } from 'framer-motion'
import { LinkProps } from '../components/common/link'
import { theme } from '../theme'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from '../lib/server-side-translations'
import { useRouter } from 'next/router'

const MotionSpan = motion<any>(chakra.span)

const NoWrap: ChakraComponent<'span', {}> = ({ children, ...props }) => (
  <chakra.span whiteSpace="nowrap" {...props}>
    {children}
  </chakra.span>
)

const Card: ChakraComponent<'div', {}> = ({ children, ...props }) => (
  <Box p={5} w="xs" borderWidth="thin" rounded="lg" {...props}>
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
  const { locale } = useRouter()
  const space = locale == 'en' ? ' ' : ''

  return (
    <VStack spacing={12} mt={12}>
      <VStack size="xl" textAlign="center">
        <Heading as="h1" size="xl">
          <MotionSpan
            animate={blueAnimate}
            transition={{
              ...transition,
              delay: 0,
            }}
          >
            <NoWrap>{t('サーヴァント')}</NoWrap>
            {space}
            <NoWrap>{t('育成目標')}</NoWrap>
            {space}
          </MotionSpan>
          <NoWrap fontSize="0.8em">{t('から')}</NoWrap>
          {space}
          <MotionSpan
            animate={greenAnimate}
            transition={{ ...transition, delay: 2 }}
          >
            <NoWrap>{t('アイテム必要数')}</NoWrap>
            {space}
          </MotionSpan>
          <chakra.span fontSize="0.8em">{t('を')}</chakra.span>
          {space}
        </Heading>
        <Heading>
          <MotionSpan
            animate={greenAnimate}
            transition={{
              ...transition,
              delay: 4,
            }}
          >
            <NoWrap>{t('アイテム必要数')}</NoWrap>
            {space}
          </MotionSpan>
          <NoWrap fontSize="0.8em">{t('から')}</NoWrap>
          {space}
          <MotionSpan
            animate={orangeAnimate}
            transition={{
              ...transition,
              delay: 6,
            }}
          >
            <NoWrap>{t('クエスト周回数')}</NoWrap>
            {space}
          </MotionSpan>
          <chakra.span fontSize="0.8em">{t('を')}</chakra.span>
          <NoWrap>{t('求めます')}</NoWrap>
        </Heading>
      </VStack>
      <Wrap justify="center" spacing={4}>
        <LinkCard href="/material">
          <Heading size="lg">{t('育成素材計算機')}</Heading>
          <Text>{t('material-calculator-description')}</Text>
        </LinkCard>

        <LinkCard href="/farming">
          <Heading size="lg">{t('周回ソルバー')}</Heading>
          <Text>{t('farming-solver-description')}</Text>
        </LinkCard>

        <LinkCard href="/servants">
          <Heading size="lg">{t('サーヴァント一覧')}</Heading>
          <Text>{t('servant-list-description')}</Text>
        </LinkCard>

        <LinkCard href="/items">
          <Heading size="lg">{t('アイテム一覧')}</Heading>
          <Text>{t('item-list-description')}</Text>
        </LinkCard>

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
      </Wrap>
    </VStack>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale),
})
