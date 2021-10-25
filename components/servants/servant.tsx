import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BreadcrumbLink } from '../common/breadcrumb-link'
import { MaterialList } from './material-list'
import { TargetKey } from '../../interfaces/atlas-academy'
import { getClassName } from '../../lib/class-names'
import { Title } from '../common/title'
import { NextPage } from 'next'
import { ServantProps } from '../../pages/servants/[id]'
import { useTranslation } from 'react-i18next'

const keys: TargetKey[] = ['ascension', 'skill', 'appendSkill']

export const Page: NextPage<ServantProps> = ({ servant }) => {
  const router = useRouter()
  const { t } = useTranslation(['servants', 'common'])
  if (router.isFallback) {
    return <Text>読み込み中...</Text>
  }
  const title = t('title', { name: servant.name })

  return (
    <VStack align="stretch" spacing={16}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/servants">
            {t('サーヴァント一覧')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <Text>{title}</Text>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack>
        <HStack>
          <Text color="yellow.500">{'★'.repeat(servant.rarity)}</Text>
          <Text>{getClassName(servant.className, router.locale)}</Text>
        </HStack>
        <Title>{title}</Title>
      </VStack>
      <SimpleGrid minChildWidth="250px" spacing={8}>
        {keys.map((key) => (
          <VStack align="stretch" key={key} spacing={4}>
            <Heading size="lg">{t(key, { ns: 'common' })}</Heading>
            <MaterialList materials={servant[`${key}Materials`]} />
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
