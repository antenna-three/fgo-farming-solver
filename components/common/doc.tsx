import { NextPage } from 'next'
import React, { FC } from 'react'
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
import { Head } from './head'
import { PageProps } from '../../pages/[page]'

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

const Page: NextPage<PageProps> = ({ title, md }) => (
  <>
    <Head title={title} />
    <ReactMarkdown components={components}>{md}</ReactMarkdown>
  </>
)

export default Page
