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
import { getJpClassName } from '../../lib/get-jp-class-name'
import { Title } from '../common/title'
import { NextPage } from 'next'
import { ServantProps } from '../../pages/servants/[id]'

const keys: { key: TargetKey; label: string }[] = [
  { key: 'ascension', label: '霊基再臨' },
  { key: 'skill', label: 'スキル強化' },
  { key: 'appendSkill', label: 'アペンドスキル強化' },
]

export const Page: NextPage<ServantProps> = ({ servant }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Text>読み込み中...</Text>
  }
  const title = `${servant.name}の強化素材`

  return (
    <VStack align="stretch" spacing={16}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/servants">サーヴァント一覧</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <Text>{title}</Text>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack>
        <HStack>
          <Text color="yellow.500">{'★'.repeat(servant.rarity)}</Text>
          <Text>{getJpClassName(servant.className)}</Text>
        </HStack>
        <Title>{title}</Title>
      </VStack>
      <SimpleGrid minChildWidth="250px" spacing={8}>
        {keys.map(({ key, label }) => (
          <VStack align="stretch" key={key} spacing={4}>
            <Heading size="lg">{label}</Heading>
            <MaterialList materials={servant[`${key}Materials`]} />
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
