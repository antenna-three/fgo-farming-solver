import React from 'react'
import { Center, Heading, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { CalcButton } from './material-calc-button'
import { MsIo } from './ms-io'
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
import { NextPage } from 'next'
import { MaterialIndexProps } from '../../pages/material'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

export const Index: NextPage<MaterialIndexProps> = ({
  servants,
  materials,
  items,
}) => {
  const { locale } = useRouter()
  const { t } = useTranslation('material')

  const ids = servants.map(({ id }) => id.toString())
  const [chaldeaState, setChaldeaState] = useChaldeaState(ids)
  const setAllChaldeaState = useAllChaldeaState(setChaldeaState)

  const tree = useServantTree(servants, locale)
  const [posession, setPosession] = useLocalStorage(
    'posession',
    Object.fromEntries(items.map((item) => [item.id, 0]))
  )
  const [selected, setSelected] = useChecked(chaldeaState, setChaldeaState)
  const { checked, onCheck, expanded, onExpand } = useCheckboxTree(
    tree,
    selected,
    setSelected,
    ['all']
  )

  return (
    <VStack spacing={8} alignItems="stretch">
      <Center>
        <Title>{t('育成素材計算機')}</Title>
      </Center>
      <Wrap justify="center" spacing={8}>
        <WrapItem w="md" maxW="md" display="block">
          <VStack align="stretch">
            <Heading size="md">{t('サーヴァント選択')}</Heading>
            <CheckboxTree
              tree={tree}
              checked={checked}
              onCheck={onCheck}
              expanded={expanded}
              onExpand={onExpand}
            />
          </VStack>
        </WrapItem>
        <WrapItem w="md" maxW="md" display="block">
          <VStack align="stretch">
            <Heading size="md">{t('全サーヴァント共通設定')}</Heading>
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
          {t('引継ぎコード')}
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
