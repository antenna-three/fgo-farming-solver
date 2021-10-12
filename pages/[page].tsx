import { GetStaticPaths, GetStaticProps } from 'next'
import ReactMarkdown from 'react-markdown'
import { Text } from '@chakra-ui/react'
import { getMd } from '../lib/get-md'
import { Head } from '../components/common/head'
import Link from 'next/link'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'

export default function Page({ title, md }: { title: string; md: string }) {
  return (
    <>
      <Head title={title} />
      <ReactMarkdown components={ChakraUIRenderer()}>{md}</ReactMarkdown>
      <Text>
        <Link href="/">
          <a>トップに戻る</a>
        </Link>
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
