/* eslint-disable react/display-name */
import { GetStaticPaths, GetStaticProps } from 'next'
import ReactMarkdown from 'react-markdown'
import {
  Box,
  Code,
  ComponentWithAs,
  Heading,
  Link,
  LinkProps,
  ListItem,
  ListItemProps,
  ListProps,
  OrderedList,
  Text,
  TextProps,
  UnorderedList,
  VStack,
} from '@chakra-ui/react'
import { getMd } from '../lib/get-md'
import { Head } from '../components/common/head'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import React, { FC } from 'react'

const h =
  (n: 2 | 3 | 4 | 5): FC =>
  (props) =>
    (
      <Heading
        {...props}
        as={`h${n}`}
        size={n == 2 ? 'xl' : n == 3 ? 'lg' : 'md'}
        mt={10 - n}
        mb={5 - n}
      />
    )

const components = {
  h1: h(2),
  h2: h(3),
  h3: h(4),
  h4: h(5),
  p: (props: TextProps) => <Text {...props} my={2} />,
  a: Link,
  ul: (props: ListProps) => <UnorderedList {...props} spacing={2} my={5} />,
  ol: (props: ListProps) => <OrderedList {...props} spacing={2} my={5} />,
  li: ListItem,
  code: Code,
}

export default function Page({ title, md }: { title: string; md: string }) {
  return (
    <>
      <Head title={title} />

      <ReactMarkdown components={components}>{md}</ReactMarkdown>

      <Text>
        <Link href="/">トップに戻る</Link>
      </Text>
    </>
  )
}
const pages = {
  about: { path: 'docs/readme.md', title: 'About' },
  news: { path: 'docs/news.md', title: 'News' },
  LICENSE: { path: 'LICENSE', title: 'LICENSE' },
  repos: { path: 'docs/repos.md', title: 'Repositories' },
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(pages).map((page) => ({
    params: { page },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params == null) return { props: { md: '' } }
  const { path, title } = pages[params.page as keyof typeof pages]
  const md = getMd(path)
  return {
    props: {
      title,
      md,
    },
  }
}
