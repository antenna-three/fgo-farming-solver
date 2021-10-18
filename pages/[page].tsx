import { GetStaticPaths, GetStaticProps } from 'next'
import ReactMarkdown from 'react-markdown'
import {
  Code,
  Heading,
  Link,
  LinkProps,
  ListItem,
  ListProps,
  OrderedList,
  Text,
  TextProps,
  UnorderedList,
} from '@chakra-ui/react'
import { getMd } from '../lib/get-md'
import { Head } from '../components/common/head'
import React, { FC } from 'react'

const h = (n: 1 | 2 | 3 | 4 | 5) => {
  const H: FC = (props) => (
    <Heading
      {...props}
      as={`h${n}`}
      size={n == 1 ? 'xl' : n == 2 ? 'lg' : 'md'}
      mt={10 - n}
      mb={5 - n}
    />
  )
  return H
}

const replace = (href?: string) => {
  if (href == null) return undefined
  return href.replace(/\.md/, '').replace(/\.\.\//, '')
}

const components = {
  h1: h(1),
  h2: h(2),
  h3: h(3),
  h4: h(4),
  p: (props: TextProps) => <Text {...props} my={2} />,
  a: ({ href, ...rest }: LinkProps) => <Link href={replace(href)} {...rest} />,
  ul: (props: ListProps) => <UnorderedList {...props} spacing={2} my={4} />,
  ol: (props: ListProps) => <OrderedList {...props} spacing={2} my={4} />,
  li: ListItem,
  code: Code,
}

const pages = {
  docs: { path: 'docs/readme.md', title: '使い方' },
  news: { path: 'docs/news.md', title: 'お知らせ' },
  contributing: { path: 'docs/contributing.md', title: 'CONTRIBUTING' },
  LICENSE: { path: 'LICENSE', title: 'LICENSE' },
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

const Page = ({ title, md }: { title: string; md: string }) => (
  <>
    <Head title={title} />

    <ReactMarkdown components={components}>{md}</ReactMarkdown>

    <Text>
      <Link href="/">トップに戻る</Link>
    </Text>
  </>
)
export default Page
