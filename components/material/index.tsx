import React, { SetStateAction, useMemo } from 'react'
import { Center, Heading, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { Head } from '../common/head'
import { ServantLevelSelect, ServantState, State } from './servant-level-select'
import { CalcButton } from './material-calc-button'
import { MsIo } from './ms-io'
import { Item, MaterialsRecord, Servant } from '../../interfaces/atlas-academy'
import { createReinforcementState } from '../../lib/create-reinforcement-state'
import { useLocalStorage } from '../../lib/use-local-storage'
import { createMergeState } from '../../lib/create-merge-state'
import { createServantTree } from '../../lib/create-tree'
import { Pagination } from './material-pagination'
import { useCheckboxTree } from '../../lib/use-checkbox-tree'
import { CheckboxTree } from '../common/checkbox-tree'
import { stateToChecked } from '../../lib/state-to-checked'
import { ExternalLink } from '../common/link'

export const Index = ({
  servants,
  materials,
  items,
}: {
  servants: Servant[]
  materials: { [id: string]: MaterialsRecord }
  items: Item[]
}) => {
  const initialState = useMemo(
    () =>
      createReinforcementState([
        'all',
        ...servants.map((servant) => servant.id.toString()),
      ]),
    [servants]
  )
  const mergeState = createMergeState(initialState)
  const [state, setState] = useLocalStorage(
    'material',
    initialState,
    mergeState
  )
  const setAllStateFunction = (
    updateServantState: (prevServantState: ServantState) => ServantState
  ) => {
    setState((prevState) => {
      const nextState = Object.fromEntries(
        Object.entries(prevState).map(([id, prevServantState]) => [
          id,
          updateServantState(prevServantState),
        ])
      )
      return nextState
    })
  }
  const setAllState = (s: SetStateAction<ServantState>) => {
    typeof s == 'function'
      ? setAllStateFunction(s)
      : setAllStateFunction(() => s)
  }

  const tree = createServantTree(servants)
  const [posession, setPosession] = useLocalStorage(
    'posession',
    Object.fromEntries(items.map((item) => [item.id, 0]))
  )
  const [checked, setChecked] = stateToChecked(state, setState)
  const { onCheck, checkedTree } = useCheckboxTree(tree, checked, setChecked)

  return (
    <VStack spacing={8} alignItems="stretch">
      <Head title="育成素材計算機" />
      <Center>
        <Heading as="h1">育成素材計算機</Heading>
      </Center>
      <Wrap justify="center" spacing={8}>
        <WrapItem w="md" maxW="md" display="block">
          <VStack align="stretch">
            <Heading size="md">育成サーヴァント選択</Heading>
            <CheckboxTree
              tree={tree}
              checkedTree={checkedTree}
              onCheck={onCheck}
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
          <ExternalLink href="http://fgosimulator.webcrow.jp/Material/">
            Material Simulator
          </ExternalLink>{' '}
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
