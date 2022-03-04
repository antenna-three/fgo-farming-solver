import React, { useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormLabel,
  useBoolean,
  VStack,
} from '@chakra-ui/react'
import { useQuestTree } from '../../hooks/use-quest-tree'
import { useLocalStorage } from '../../hooks/use-local-storage'
import { useCheckboxTree } from '../../hooks/use-checkbox-tree'
import { useChecked } from '../../hooks/use-checked-from-quest-state'
import { Link } from '../common/link'
import { ObjectiveFieldset } from './objective-fieldset'
import { ItemFieldset } from './item-fieldset'
import { CheckboxTree } from '../common/checkbox-tree'
import { DropRateSelect } from './drop-rate-select'
import { ResetAlertDialog } from './reset-alert-dialog'
import { groupBy } from '../../utils/group-by'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import { FarmingIndexProps } from '../../pages/farming'
import { Localized } from '../../lib/get-local-items'
import { Item } from '../../interfaces/fgodrop'

type InputState = {
  objective: string
  items: { [key: string]: string }
  quests: string[]
  halfDailyAp: boolean
  dropMergeMethod: string
}
type QueryInputState = {
  objective: string
  items: string
  quests: string
  ap_coefficients: string
  drop_merge_method: string
}

const inputToQuery: (inputState: InputState) => QueryInputState = ({
  objective,
  items,
  quests,
  halfDailyAp,
  dropMergeMethod,
}) => ({
  objective,
  items: Object.entries(items)
    .filter(([, count]) => count != '')
    .map(([item, count]) => item + ':' + count)
    .join(','),
  quests: quests
    .reduce(
      (acc, cur) =>
        acc.includes(cur[0]) || acc.includes(cur.slice(0, 2))
          ? acc
          : [...acc, cur],
      [] as string[]
    )
    .join(','),
  ap_coefficients: halfDailyAp ? '0:0.5' : '',
  drop_merge_method: dropMergeMethod,
})

const queryToInput: (
  baseInputState: InputState,
  queryInputState: QueryInputState
) => InputState = (
  baseInputState,
  { objective, items, quests, ap_coefficients, drop_merge_method }
) => {
  const queryQuests = quests ? quests.split(',') : ['0', '1', '2', '3']
  return {
    objective: objective || baseInputState.objective || 'ap',
    items: Object.fromEntries(
      items.split(',').map((itemCount) => itemCount.split(':'))
    ),
    quests: baseInputState.quests.filter(
      (quest) =>
        queryQuests.includes(quest[0]) ||
        queryQuests.includes(quest.slice(0, 2)) ||
        queryQuests.includes(quest)
    ),
    halfDailyAp:
      ap_coefficients === '0:0.5' || baseInputState.halfDailyAp || false,
    dropMergeMethod:
      drop_merge_method || baseInputState.dropMergeMethod || 'add',
  }
}

const isInputState = (arg: any): arg is QueryInputState =>
  typeof arg.items == 'string'

export const Index: NextPage<FarmingIndexProps> = ({ items, quests }) => {
  const { t } = useTranslation('farming')
  const { tree } = useQuestTree(quests)
  const questIds = quests.map(({ id }) => id)
  const initialInputState: InputState = useMemo(
    () => ({
      objective: 'ap',
      items: Object.fromEntries(items.map((item) => [item.id, ''])),
      quests: questIds,
      halfDailyAp: false,
      dropMergeMethod: 'add',
    }),
    [items, questIds]
  )
  const [inputState, setInputState] = useLocalStorage(
    'input',
    initialInputState
  )
  const router = useRouter()
  const [isConfirming, setIsConfirming] = useBoolean()
  const [isLoading, setIsLoading] = useBoolean(false)
  const [selected, setSelected] = useChecked(
    questIds,
    inputState.quests,
    setInputState
  )
  const { checked, onCheck, expanded, onExpand } = useCheckboxTree(
    tree,
    selected,
    setSelected
  )

  useEffect(() => {
    const { query } = router
    if (isInputState(query)) {
      setInputState((baseInputState) => queryToInput(baseInputState, query))
      router.replace('/farming', undefined, { scroll: false, shallow: true })
    }
  }, [router, setInputState])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setIsLoading.on()
      const query = inputToQuery(inputState)
      const params = new URLSearchParams({ ...query, fields: 'id' })
      const origin =
        'https://pgdz683mk2.execute-api.ap-northeast-1.amazonaws.com/fgo-farming-solver'
      const url = origin + '?' + params
      const { id } = await fetch(url).then((res) => res.json())
      if (id == null) {
        router.push('/500')
      } else {
        const url = `/farming/results/${id}`
        localStorage.setItem('farming/results', url)
        router.push(url)
      }
    },
    [inputState, router, setIsLoading]
  )

  const onReset = useCallback(() => {
    setInputState(initialInputState)
  }, [initialInputState, setInputState])

  const handleItemChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget
      setInputState((state) => ({
        ...state,
        items: { ...state.items, [name]: value },
      }))
    },
    [setInputState]
  )

  const itemGroups = Object.entries(
    groupBy(items, ({ largeCategory }) => largeCategory)
  ).map(([largeCategory, items]): [string, [string, Localized<Item>[]][]] => [
    largeCategory,
    Object.entries(groupBy(items, ({ category }) => category)),
  ])

  return (
    <form onSubmit={handleSubmit}>
      <VStack alignItems="start" spacing={8}>
        <ObjectiveFieldset
          objective={inputState.objective}
          setObjective={(objective) => {
            setInputState((state) => ({ ...state, objective }))
          }}
        />
        <ItemFieldset
          itemGroups={itemGroups}
          inputItems={inputState.items}
          handleChange={handleItemChange}
        />
        {Object.values(inputState.items).every((s) => !s) && (
          <Alert status="error">
            <AlertIcon />
            {t('集めたいアイテムの数を最低1つ入力してください。')}
          </Alert>
        )}
        <FormControl as="fieldset">
          <FormLabel as="legend">{t('周回対象に含めるクエスト')}</FormLabel>
          <CheckboxTree
            tree={tree}
            checked={checked}
            onCheck={onCheck}
            expanded={expanded}
            onExpand={onExpand}
          />
        </FormControl>
        {inputState.quests.length == 0 && (
          <Alert status="error">
            <AlertIcon />
            {t('周回対象に含めるクエストを最低1つ選択してください。')}
          </Alert>
        )}
        <FormControl as="fieldset">
          <FormLabel as="legend">{t('キャンペーン')}</FormLabel>
          <Checkbox
            isChecked={inputState.halfDailyAp}
            onChange={(event) => {
              const { checked } = event.currentTarget
              setInputState((state) => ({ ...state, halfDailyAp: checked }))
            }}
          >
            {t('修練場AP半減')}
          </Checkbox>
        </FormControl>
        <DropRateSelect
          dropMergeMethod={inputState.dropMergeMethod}
          setDropMergeMethod={(dropMergeMethod) =>
            setInputState((state) => ({ ...state, dropMergeMethod }))
          }
        />
        <ButtonGroup>
          <Button
            type="submit"
            disabled={
              Object.values(inputState.items).every((s) => !s) ||
              inputState.quests.length == 0
            }
            colorScheme="blue"
            isLoading={isLoading}
            p={8}
          >
            {t('周回数を求める')}
          </Button>
          <Button type="button" onClick={setIsConfirming.on} p={8}>
            {t('リセット')}
          </Button>
        </ButtonGroup>
        <ResetAlertDialog
          isOpen={isConfirming}
          onClose={setIsConfirming.off}
          onReset={onReset}
        />

        <Link
          href={{
            pathname: '/farming/import-export',
            query: inputToQuery(inputState),
          }}
        >
          {t('入力内容のエクスポート')}
        </Link>
      </VStack>
    </form>
  )
}
