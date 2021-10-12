import {
  Heading,
  chakra,
  VStack,
  Box,
  ChakraComponent,
  Flex,
} from '@chakra-ui/react'
import React from 'react'
import { motion, TargetAndTransition, Transition } from 'framer-motion'
import { Link, A } from '../components/common/link'
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
  <Box m={2} p={5} maxW="xs" borderWidth="thin" borderRadius="lg" {...props}>
    <VStack spacing={5}>{children}</VStack>
  </Box>
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
      <Flex flexWrap="wrap" justifyContent="center">
        <Card>
          <Link href="/material">
            <Heading size="lg">育成素材計算機</Heading>
          </Link>
          <p>育成したいサーヴァントから、必要な素材の合計を求めます。</p>
        </Card>
        <Card>
          <Link href="/farming">
            <Heading size="lg">周回ソルバー</Heading>
          </Link>
          <p>欲しい素材の数から、最も効率的なクエスト周回数を求めます。</p>
        </Card>
        <Card>
          <Link href="/servants">
            <Heading size="lg">サーヴァント一覧</Heading>
          </Link>
          <p>サーヴァントの育成に必要な素材を確認できます。</p>
        </Card>
        <Card>
          <Link href="/items">
            <Heading size="lg">アイテム一覧</Heading>
          </Link>
          <p>アイテムのクエストごとのドロップ率を確認できます。</p>
        </Card>
        <Card>
          <A
            href={`https://twitter.com/search?q=${encodeURIComponent(
              '#FGO周回ソルバー'
            )}`}
            isExternal
          >
            <Heading size="lg">
              みんなの結果
              <ExternalLinkIcon mx={2} />
            </Heading>
          </A>
          <p>Twitterに投稿された計算結果を見られます。</p>
        </Card>
      </Flex>
    </VStack>
  )
}
export default Index
