import NextLink from 'next/link'
import { Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { BiWindows } from 'react-icons/bi'
import { MdDevices, MdDownload, MdImportExport } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { Title } from '../common/title'
import { useRouter } from 'next/router'
import { Link } from '../common/link'

export const ImportExport = () => {
  const { t } = useTranslation('farming')
  const { locale, query } = useRouter()
  const url = `/farming?${new URLSearchParams(
    query as Record<string, string>
  ).toString()}`

  return (
    <>
      <VStack align="start" spacing={8}>
        <Heading as="h1">
          <HStack>
            <MdImportExport />
            <Title>{t('入力内容のインポート・エクスポート')}</Title>
          </HStack>
        </Heading>
        <Text>
          {t('フォームの入力内容を他のデバイスやブラウザとやり取りできます。')}
        </Text>

        <VStack align="start">
          <Heading size="lg">
            <HStack>
              <MdDevices />
              <Text>{t('他のデバイスへのエクスポート')}</Text>
            </HStack>
          </Heading>
          <Text>{t('export-device-description')}</Text>
        </VStack>
        <VStack align="start">
          <Heading size="lg">
            <HStack>
              <BiWindows />
              <Text>{t('他のブラウザへのエクスポート')}</Text>
            </HStack>
          </Heading>
          <Text>{t('export-browser-description')}</Text>
        </VStack>
        <VStack align="start">
          <Heading size="lg">
            <HStack>
              <MdDownload />
              <Text>{t('入力内容のインポート')}</Text>
            </HStack>
          </Heading>
          <Text>
            {locale == 'en' && 'Return to the form from '}
            <Link as={NextLink} href={url}>
              {locale == 'en' ? 'here.' : 'こちら'}
            </Link>
            {locale != 'en' && 'から入力フォームへ戻ってください。'}
          </Text>
        </VStack>
      </VStack>
    </>
  )
}
