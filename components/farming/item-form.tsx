import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ItemFieldset } from './item-fieldset'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { ObjectiveFieldset } from './objective-fieldset'
import { DropRateSelect } from './drop-rate-select'
import { Link } from '../common/link'
import { getLargeCategory } from '../../lib/get-large-category'
import { createQuestTree } from '../../lib/create-tree'
import { useLocalStorage } from '../../lib/use-local-storage'
import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormLabel,
  VStack,
} from '@chakra-ui/react'
import { ResetAlertDialog } from './reset-alert-dialog'
import { useCheckboxTree } from '../../lib/use-checkbox-tree'
import { questsToChecked } from '../../lib/quests-to-checked'
import { CheckboxTree } from '../common/checkbox-tree'

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
type QuestChecked = { [id: string]: boolean }

const inputToQuery: (inputState: InputState) => QueryInputState = ({
  objective,
  items,
  quests,
  halfDailyAp,
  dropMergeMethod,
}) => ({
  objective,
  items: Object.entries(items)
    .filter(([item, count]) => count != '')
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

export const ItemForm = ({
  items,
  quests,
}: {
  items: { category: string; name: string; id: string }[]
  quests: {
    section: string
    area: string
    name: string
    id: string
    samples_1: number
    samples_2: number
  }[]
}) => {
  const { tree } = useMemo(() => createQuestTree(quests), [quests])
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
  const [isConfirming, setIsConfirming] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [checked, setChecked] = questsToChecked(
    questIds,
    inputState.quests,
    setInputState
  )
  const { onCheck, checkedTree } = useCheckboxTree(tree, checked, setChecked)

  useEffect(() => {
    const { query } = router
    if (isInputState(query)) {
      setInputState((baseInputState) => queryToInput(baseInputState, query))
      router.replace('/farming', undefined, { scroll: false, shallow: true })
    }
  }, [router, setInputState])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    const query = inputToQuery(inputState)
    const params = new URLSearchParams({ ...query, fields: 'id' })
    const origin =
      'https://pgdz683mk2.execute-api.ap-northeast-1.amazonaws.com/fgo-farming-solver'
    const url = origin + '?' + params
    const { id } = await fetch(url).then((res) => res.json())
    if (id == null) {
      router.push('/500')
    } else {
      router.push(`/farming/results/${id}`)
    }
  }

  const onCloseAlert = useCallback(() => {
    setIsConfirming(false)
  }, [])
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

  const itemGroups = Object.entries(_.groupBy(items, (item) => item.category))
  const categoryGroups = Object.entries(
    _.groupBy(itemGroups, ([category, _]) => getLargeCategory(category))
  )

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
          categoryGroups={categoryGroups}
          inputItems={inputState.items}
          handleChange={handleItemChange}
        />
        {Object.values(inputState.items).every((s) => !s) && (
          <Alert status="error">
            <AlertIcon />
            集めたいアイテムの数を最低1つ入力してください。
          </Alert>
        )}
        <FormControl as="fieldset">
          <FormLabel as="legend">周回対象に含めるクエスト</FormLabel>
          <CheckboxTree
            tree={tree}
            checkedTree={checkedTree}
            onCheck={onCheck}
          />
        </FormControl>
        {inputState.quests.length == 0 && (
          <Alert status="error">
            <AlertIcon />
            周回対象に含めるクエストを最低1つ選択してください。
          </Alert>
        )}
        <FormControl as="fieldset">
          <FormLabel as="legend">キャンペーン</FormLabel>
          <Checkbox
            checked={inputState.halfDailyAp}
            onChange={(event) => {
              const { checked } = event.currentTarget
              setInputState((state) => ({ ...state, halfDailyAp: checked }))
            }}
          >
            修練場AP半減
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
          >
            周回数を求める
          </Button>
          <Button
            type="button"
            onClick={() => {
              setIsConfirming(true)
            }}
          >
            リセット
          </Button>
        </ButtonGroup>
        <ResetAlertDialog
          isOpen={isConfirming}
          onClose={onCloseAlert}
          onReset={onReset}
        />

        <Link
          href={{
            pathname: '/farming/import-export',
            query: inputToQuery(inputState),
          }}
        >
          入力内容のエクスポート
        </Link>
      </VStack>
    </form>
  )
}
