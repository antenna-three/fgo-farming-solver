import NextLink from 'next/link'
import { Heading, HStack, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { BiWindows } from 'react-icons/bi'
import { MdDevices, MdDownload, MdImportExport } from 'react-icons/md'
import { Head } from '../../components/common/head'
import { useQuery } from '../../lib/use-query'

export const ImportExport = () => {
  const [query, setQuery] = useQuery()

  return (
    <>
      <Head title="入力内容のインポート・エクスポート" />
      <VStack align="start" spacing={8}>
        <Heading as="h1">
          <HStack>
            <MdImportExport />
            <Text>入力内容のインポート・エクスポート</Text>
          </HStack>
        </Heading>
        <Text>
          フォームの入力内容を他のデバイスやブラウザとやり取りできます。
        </Text>

        <VStack align="start">
          <Heading size="lg">
            <HStack>
              <MdDevices />
              <Text>他のデバイスへのエクスポート</Text>
            </HStack>
          </Heading>
          <Text>
            ChromeやSafariなど、ブックマーク同期機能を持ったブラウザでこのページをブックマークしてください。
          </Text>
          <Text>
            その後、入力データを開きたいデバイスでブックマークを開いてください。
          </Text>
        </VStack>
        <VStack align="start">
          <Heading size="lg">
            <HStack>
              <BiWindows />
              <Text>他のブラウザへのエクスポート</Text>
            </HStack>
          </Heading>
          <Text>
            このページのURLをコピーして、他のブラウザに貼り付けてください。
          </Text>
        </VStack>
        <VStack align="start">
          <Heading size="lg">
            <HStack>
              <MdDownload />
              <Text>入力内容のインポート</Text>
            </HStack>
          </Heading>
          <Text>
            <NextLink href={{ pathname: '/farming', query: query }} passHref>
              <Link>こちら</Link>
            </NextLink>
            から入力フォームへ戻ってください。
          </Text>
        </VStack>
      </VStack>
    </>
  )
}
