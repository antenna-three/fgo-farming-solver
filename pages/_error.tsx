import { Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { Link } from '../components/common/link'
import React from 'react'
import { Head } from '../components/common/head'

const statusCodes: { [code: number]: string } = {
  400: 'Bad Request',
  404: 'Not Found',
  405: 'Mothod Not Allowed',
  500: 'Internal Server Error',
}

const messages: { [code: number]: string | string[] } = {
  404: [
    'ページが見つかりませんでした。',
    'URLが間違っている可能性があります。',
  ],
  500: ['サーバーに問題があります。', 'サイト管理者にお問い合わせください。'],
}

export default function Error({
  statusCode,
  title,
  message,
}: {
  statusCode: number
  title?: string
  message?: string | string[]
}) {
  title = title || statusCodes[statusCode] || 'An unexpected error has occured'
  message = message || messages[statusCode]
  return (
    <>
      <Head title={`${statusCode} ${title}`} />
      <VStack align="start">
        <Heading as="h1">
          <HStack>
            <Text>{statusCode}</Text>
            <Text fontWeight="normal">{title}</Text>
          </HStack>
        </Heading>
        {Array.isArray(message) ? (
          message.map((m, i) => <Text key={i}>{m}</Text>)
        ) : (
          <Text>{message}</Text>
        )}

        <Link href="/">トップに戻る</Link>
      </VStack>
    </>
  )
}
