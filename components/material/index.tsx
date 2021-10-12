import React, { SetStateAction, useState } from 'react'
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { Head } from '../common/head'
import { PageList } from './material-page-list'
import { ServantLevelSelect, ServantState } from './servant-level-select'
import { ServantTree } from './servant-tree'
import { CalcButton } from './material-calc-button'
import { MsIo } from './ms-io'
import { Item, MaterialsRecord, Servant } from '../../interfaces/atlas-academy'
import { createReinforcementState } from '../../lib/create-reinforcement-state'
import { useLocalStorage } from '../../lib/use-local-storage'
import { createMergeState } from '../../lib/create-merge-state'
import { A } from '../common/link'
import { createServantTree } from '../../lib/create-tree'
import { Pagination } from './material-pagination'

export const Index = ({
  servants,
  materials,
  items,
}: {
  servants: Servant[]
  materials: { [id: string]: MaterialsRecord }
  items: Item[]
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
  const setAllStateFunction = (
    dispatch: (prevServantState: ServantState) => ServantState
  ) => {
    setState((prevState) => {
      const nextState = Object.fromEntries(
        Object.entries(prevState).map(([id, prevServantState]) => [
          id,
          dispatch(prevServantState),
        ])
      )
      return nextState
    })
  }
  const setAllState = (s: SetStateAction<ServantState>) => {
    typeof s == 'function'
      ? setAllStateFunction(s)
      : setAllStateFunction((p) => s)
  }

  const tree = createServantTree(servants)
  const checked = Object.entries(state)
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
  const [posession, setPosession] = useLocalStorage(
    'posession',
    Object.fromEntries(items.map((item) => [item.id, 0]))
  )

  return (
    <VStack spacing={8} alignItems="stretch">
      <Head title="育成素材計算機" />
      <Center>
        <Heading as="h1">育成素材計算機</Heading>
      </Center>
      <Wrap justify="center" spacing={8}>
        <WrapItem w="md" maxW="md" display="block">
          <VStack align="start">
            <Heading size="md">育成サーヴァント選択</Heading>
            <ServantTree
              tree={tree}
              checked={checked}
              expanded={expanded}
              onCheck={onCheck}
              onExpand={onExpand}
            />
          </VStack>
        </WrapItem>

        <WrapItem w="md" maxW="md" display="block">
          <VStack align="stretch">
            <Heading size="md">全サーヴァント共通設定</Heading>
            <ServantLevelSelect
              id={'all'}
              servantState={state.all}
              setState={setState}
              setServantState={setAllState}
            />
          </VStack>
        </WrapItem>
      </Wrap>
      <Pagination />
      <Center>
        <CalcButton
          state={state}
          materials={materials}
          colorScheme="blue"
          p={8}
        />
      </Center>
      <VStack align="stretch">
        <Heading size="md">
          <A href="http://fgosimulator.webcrow.jp/Material/" isExternal>
            Material Simulator
          </A>{' '}
          引継ぎコード
        </Heading>
        <MsIo
          servants={servants}
          state={state}
          setState={setState}
          items={items}
          posession={posession}
          setPosession={setPosession}
        />
      </VStack>
    </VStack>
  )
}
