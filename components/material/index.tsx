import React from 'react'
import { Center, Heading, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { Head } from '../common/head'
import { CalcButton } from './material-calc-button'
import { MsIo } from './ms-io'
import { Item, MaterialsRecord, Servant } from '../../interfaces/atlas-academy'
import { useLocalStorage } from '../../hooks/use-local-storage'
import { useServantTree } from '../../hooks/use-servant-tree'
import { Pagination } from './material-pagination'
import { useCheckboxTree } from '../../hooks/use-checkbox-tree'
import { CheckboxTree } from '../common/checkbox-tree'
import { useChecked } from '../../hooks/use-checked-from-chaldea-state'
import { ExternalLink } from '../common/link'
import { useChaldeaState } from '../../hooks/use-chaldea-state'
import { ServantLevelSelect } from './servant-level-select'
import { useAllChaldeaState } from '../../hooks/use-all-chaldea-state'
import { Title } from '../common/title'

export const Index = ({
  servants,
  materials,
  items,
}: {
  servants: Servant[]
  materials: { [id: string]: MaterialsRecord }
  items: Item[]
}) => {
  const ids = servants.map(({ id }) => id.toString())
  const [chaldeaState, setChaldeaState] = useChaldeaState(ids)
  const setAllChaldeaState = useAllChaldeaState(setChaldeaState)

  const tree = useServantTree(servants)
  const [posession, setPosession] = useLocalStorage(
    'posession',
    Object.fromEntries(items.map((item) => [item.id, 0]))
  )
  const [checked, setChecked] = useChecked(chaldeaState, setChaldeaState)
  const { onCheck, checkedTree } = useCheckboxTree(tree, checked, setChecked)

  return (
    <VStack spacing={8} alignItems="stretch">
      <Center>
        <Title>育成素材計算機</Title>
      </Center>
      <Wrap justify="center" spacing={8}>
        <WrapItem w="md" maxW="md" display="block">
          <VStack align="stretch">
            <Heading size="md">育成サーヴァント選択</Heading>
            <CheckboxTree
              tree={tree}
              checkedTree={checkedTree}
              onCheck={onCheck}
              defaultIndex={[0]}
            />
          </VStack>
        </WrapItem>
        <WrapItem w="md" maxW="md" display="block">
          <VStack align="stretch">
            <Heading size="md">全サーヴァント共通設定</Heading>
            <ServantLevelSelect
              id={'all'}
              servantState={chaldeaState.all}
              setState={setChaldeaState}
              setServantState={setAllChaldeaState}
            />
          </VStack>
        </WrapItem>
      </Wrap>
      <Pagination />
      <Center>
        <CalcButton
          state={chaldeaState}
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
          state={chaldeaState}
          setState={setChaldeaState}
          items={items}
          posession={posession}
          setPosession={setPosession}
        />
      </VStack>
    </VStack>
  )
}
