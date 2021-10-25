import { Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Head } from '../components/common/head'
import { useRouter } from 'next/router'
import { TopLink } from '../components/common/top-link'

const statusCodes: { [code: number]: string } = {
  400: 'Bad Request',
  404: 'Not Found',
  405: 'Mothod Not Allowed',
  500: 'Internal Server Error',
}

const messages: { [code: number]: { [locale: string]: string | string[] } } = {
  404: {
    ja: [
      'ページが見つかりませんでした。',
      'URLが間違っている可能性があります。',
    ],
    en: ['The page was not found.', 'Is your URL valid?'],
  },
  500: {
    ja: ['サーバーに問題があります。', 'サイト管理者にお問い合わせください。'],
    en: [
      'An error occured on the server.',
      'Ask the website administrator for more information.',
    ],
  },
}

const Error = ({
  statusCode,
  title,
  message,
}: {
  statusCode: number
  title?: string
  message?: string | string[]
}) => {
  const { locale } = useRouter()
  title = title || statusCodes[statusCode] || 'An unexpected error has occured'
  message ||= messages[statusCode][locale ?? 'ja']

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
        <TopLink />
      </VStack>
    </>
  )
}

export default Error
