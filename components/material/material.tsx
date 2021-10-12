import React, { useState } from 'react'
import { Head } from '../common/head'
import { ServantLevelSelect } from './servant-level-select'
import { createReinforcementState } from '../../lib/create-reinforcement-state'
import { useLocalStorage } from '../../lib/use-local-storage'
import { Pagination } from './material-pagination'
import { PageList } from './material-page-list'
import { MaterialsRecord, Servant } from '../../interfaces/atlas-academy'
import { CalcButton } from './material-calc-button'
import { getJpClassName } from '../../lib/get-jp-class-name'
import { ServantTree } from './servant-tree'
import { createMergeState } from '../../lib/create-merge-state'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { createClassTree } from '../../lib/create-tree'
import { BreadcrumbLink } from '../common/breadcrumb-link'
import { Link } from '../common/link'

export const Material = ({
  servants,
  materials,
  className,
}: {
  servants: Servant[]
  materials: { [id: string]: MaterialsRecord }
  className: string
}) => {
  const initialState = createReinforcementState([
    'all',
    ...servants.map((servant) => servant.id.toString()),
  ])
  const mergeState = createMergeState(initialState)
  const [state, setState] = useLocalStorage(
    'material',
    initialState,
    mergeState
  )
  const currentClassServants = servants.filter(
    (servant) => servant.className == className
  )
  const currentClassIds = currentClassServants.map(({ id }) => id.toString())
  const enabledServants = currentClassServants.filter(
    (servant) => !state[servant.id].disabled
  )
  const jpClassName = getJpClassName(className)

  const tree = [createClassTree(className, currentClassServants)]
  const checked = Object.entries(state)
    .filter(([id, _]) => currentClassIds.includes(id))
    .filter(([id, { disabled }]) => !disabled)
    .map(([id, { disabled }]) => id)
  const onCheck = (ids: string[]) =>
    setState((state) => ({
      ...state,
      ...Object.fromEntries(
        Object.entries(state).map(([id, servantState]) => [
          [id],
          { ...servantState, disabled: !ids.includes(id) },
        ])
      ),
    }))
  const [expanded, onExpand] = useState(['all'])

  return (
    <VStack alignItems="stretch" spacing={8}>
      <Head title={`${jpClassName} | 育成素材計算機`} />
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/material">育成素材計算機</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{jpClassName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack align="start">
        <Heading size="md">サーヴァント選択</Heading>
        <ServantTree
          tree={tree}
          checked={checked}
          expanded={expanded}
          onCheck={onCheck}
          onExpand={onExpand}
        />
      </VStack>
      <VStack align="stretch">
        <Heading size="md">個別設定</Heading>
        <SimpleGrid minChildWidth="300px" spacing={10}>
          {enabledServants.map(({ id, name }) => (
            <VStack align="stretch" key={id}>
              <Heading fontSize="xl">
                <Link href={`/servants/${id}`}>{name}</Link>
              </Heading>
              <ServantLevelSelect
                id={id.toString()}
                servantState={state[id.toString()]}
                setState={setState}
              />
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
      {enabledServants.length == 0 && (
        <Text>{jpClassName}のサーヴァントは選択されていません。</Text>
      )}
      <Box alignSelf="center">
        <CalcButton
          state={state}
          materials={materials}
          colorScheme="blue"
          p={8}
        />
      </Box>
      <Pagination currentClassName={className} />
      <PageList currentClassName={className} />
    </VStack>
  )
}
