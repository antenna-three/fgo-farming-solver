import React from 'react'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { MaterialsRecord, Servant } from '../../interfaces/atlas-academy'
import { createReinforcementState } from '../../lib/create-reinforcement-state'
import { useLocalStorage } from '../../lib/use-local-storage'
import { createClassNode } from '../../lib/create-tree'
import { stateToChecked } from '../../lib/state-to-checked'
import { useCheckboxTree } from '../../lib/use-checkbox-tree'
import { getJpClassName } from '../../lib/get-jp-class-name'
import { createMergeState } from '../../lib/create-merge-state'
import { Link } from '../common/link'
import { Head } from '../common/head'
import { BreadcrumbLink } from '../common/breadcrumb-link'
import { CheckboxTree } from '../common/checkbox-tree'
import { CalcButton } from './material-calc-button'
import { Pagination } from './material-pagination'
import { ServantLevelSelect } from './servant-level-select'

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

  const tree = [createClassNode(className, currentClassServants)]
  const [checked, setChecked] = stateToChecked(state, setState)
  const { onCheck, checkedTree } = useCheckboxTree(tree, checked, setChecked)

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
      <VStack align="stretch">
        <Heading size="md">サーヴァント選択</Heading>
        <CheckboxTree tree={tree} checkedTree={checkedTree} onCheck={onCheck} />
      </VStack>
      <VStack align="stretch">
        <Heading size="md">個別設定</Heading>
        <SimpleGrid minChildWidth="300px" spacing={10}>
          {enabledServants.map(({ id, name }) => (
            <VStack align="stretch" maxWidth="md" key={id}>
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
      <Pagination currentClassName={className} />
      <Box alignSelf="center">
        <CalcButton state={state} materials={materials} colorScheme="blue" />
      </Box>
    </VStack>
  )
}
