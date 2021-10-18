import {
  Heading,
  chakra,
  VStack,
  Box,
  ChakraComponent,
  Flex,
  HStack,
  Text,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Wrap,
} from '@chakra-ui/react'
import React from 'react'
import { motion, TargetAndTransition, Transition } from 'framer-motion'
import { Link, LinkProps } from '../components/common/link'
import { theme } from '../theme'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const Span = chakra.span
const MotionSpan = motion<any>(Span)

const NoWrap: ChakraComponent<'span', {}> = ({ children, ...props }) => (
  <chakra.span whiteSpace="nowrap" {...props}>
    {children}
  </chakra.span>
)

const Card: ChakraComponent<'div', {}> = ({ children, ...props }) => (
  <Box p={5} maxW="xs" borderWidth="thin" rounded="lg" {...props}>
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
  <Link href={href} color="inherit" _hover={{}}>
    <Card
      _hover={{
        boxShadow: 'lg',
      }}
      {...props}
    >
      {children}
    </Card>
  </Link>
)

const ExternalLinkCard: ChakraComponent<'div', ChakraLinkProps> = ({
  href,
  children,
  ...props
}) => (
  <ChakraLink href={href} color="inherit" _hover={{}} isExternal>
    <Card _hover={{ boxShadow: 'lg' }} {...props}>
      {children}
    </Card>
  </ChakraLink>
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
  return (
    <VStack>
      <VStack my={10} size="xl" textAlign="center">
        <Heading as="h1">
          <MotionSpan
            animate={blueAnimate}
            transition={{
              ...transition,
              delay: 0,
            }}
          >
            <NoWrap>サーヴァント</NoWrap>
            <NoWrap>育成目標</NoWrap>
          </MotionSpan>
          <NoWrap fontSize="0.8em">から</NoWrap>
          <MotionSpan
            animate={greenAnimate}
            transition={{ ...transition, delay: 2 }}
          >
            <NoWrap>アイテム必要数</NoWrap>
          </MotionSpan>
          <Span fontSize="0.8em">を</Span>
        </Heading>
        <Heading>
          <MotionSpan
            animate={greenAnimate}
            transition={{
              ...transition,
              delay: 4,
            }}
          >
            <NoWrap>アイテム必要数</NoWrap>
          </MotionSpan>
          <NoWrap fontSize="0.8em">から</NoWrap>
          <MotionSpan
            animate={orangeAnimate}
            transition={{
              ...transition,
              delay: 6,
            }}
          >
            <NoWrap>クエスト周回数</NoWrap>
          </MotionSpan>
          <Span fontSize="0.8em">を</Span>
          <NoWrap>求めます</NoWrap>
        </Heading>
      </VStack>
      <Wrap justify="center" spacing={4}>
        <LinkCard href="/material">
          <Heading size="lg">育成素材計算機</Heading>
          <Text>育成したいサーヴァントから、必要な素材の合計を求めます。</Text>
        </LinkCard>

        <LinkCard href="/farming">
          <Heading size="lg">周回ソルバー</Heading>
          <Text>
            欲しい素材の数から、最も効率的なクエスト周回数を求めます。
          </Text>
        </LinkCard>

        <LinkCard href="/servants">
          <Heading size="lg">サーヴァント一覧</Heading>
          <Text>サーヴァントの育成に必要な素材を確認できます。</Text>
        </LinkCard>

        <LinkCard href="/items">
          <Heading size="lg">アイテム一覧</Heading>
          <Text>アイテムのクエストごとのドロップ率を確認できます。</Text>
        </LinkCard>

        <ExternalLinkCard
          href={`https://twitter.com/search?q=${encodeURIComponent(
            '#FGO周回ソルバー'
          )}`}
        >
          <Heading size="lg">
            みんなの結果
            <ExternalLinkIcon mx={2} />
          </Heading>
          <Text>Twitterに投稿された計算結果を見られます。</Text>
        </ExternalLinkCard>
      </Wrap>
    </VStack>
  )
}
export default Index
