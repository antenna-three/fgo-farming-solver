import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  StackDivider,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BreadcrumbLink } from '../common/breadcrumb-link'
import { MaterialList } from './material-list'
import { NiceServant, TargetKey } from '../../interfaces/atlas-academy'
import { getJpClassName } from '../../lib/get-jp-class-name'
import { Head } from '../common/head'

const keys: { key: TargetKey; label: string }[] = [
  { key: 'ascension', label: '霊基再臨' },
  { key: 'skill', label: 'スキル強化' },
  { key: 'appendSkill', label: 'アペンドスキル強化' },
]

export const Page = ({ servant }: { servant: NiceServant }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Text>読み込み中...</Text>
  }

  return (
    <>
      <Head title={`${servant.name}の強化素材`} />
      <VStack align="stretch" spacing={16}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/servants">サーヴァント一覧</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Text>{servant.name}</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <VStack>
          <HStack>
            <Text color="yellow.500">{'★'.repeat(servant.rarity)}</Text>
            <Text>{getJpClassName(servant.className)}</Text>
          </HStack>
          <Heading as="h1">{servant.name}</Heading>
        </VStack>
        <SimpleGrid minChildWidth="250px" spacing={8}>
          {keys.map(({ key, label }) => (
            <VStack align="stretch" key={key} spacing={4}>
              <Heading size="lg">{label}素材</Heading>
              <MaterialList materials={servant[`${key}Materials`]} />
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
    </>
  )
}
