import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormLabel,
  useBoolean,
  VStack
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo
} from 'react'
import { useTranslation } from 'react-i18next'
import { useCheckboxTree } from '../../hooks/use-checkbox-tree'
import { useChecked } from '../../hooks/use-checked-from-quest-state'
import { useLocalStorage } from '../../hooks/use-local-storage'
import { useQuestTree } from '../../hooks/use-quest-tree'
import { Item } from '../../interfaces/fgodrop'
import { Localized } from '../../lib/get-local-items'
import { FarmingIndexProps } from '../../pages/farming'
import { groupBy } from '../../utils/group-by'
import { CheckboxTree } from '../common/checkbox-tree'
import { DropRateSelect } from './drop-rate-select'
import { ItemFieldset } from './item-fieldset'
import { ObjectiveFieldset } from './objective-fieldset'
import { ResetAlertDialog } from './reset-alert-dialog'

type InputState = {
  objective: string
  itemCounts: { [key: string]: string }
  checkedQuests: string[]
  halfDailyAp: boolean
  dropMergeMethod: string
}
type QueryInputState = {
  objective?: string
  items: string
  quests?: string
  ap_coefficients?: string
  drop_merge_method?: string
}

const inputToQuery = ({
  objective,
  itemCounts,
  checkedQuests,
  halfDailyAp,
  dropMergeMethod,
}: InputState) => ({
  objective,
  items: Object.entries(itemCounts)
    .filter(([, count]) => count != '')
    .map(([item, count]) => item + ':' + count)
    .join(','),
  quests: checkedQuests
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

export const migrateLocalInput = () => {
  const json = localStorage.getItem('input')
  if (json == null || json == 'undefined') {
    return
  }
  const input = JSON.parse(json) as InputState
  Object.entries(input).forEach(([key, value]) =>
    localStorage.setItem(key, JSON.stringify(value))
  )
  localStorage.removeItem('input')
}

const hasItems = (arg: unknown): arg is { items: unknown } =>
  typeof arg == 'object' && arg != null && 'items' in arg

const isInputState = (arg: unknown): arg is QueryInputState =>
  hasItems(arg) && typeof arg.items == 'string'

const hasId = (arg: unknown): arg is { id: unknown } =>
  typeof arg == 'object' && arg != null && 'id' in arg

export const Index: NextPage<FarmingIndexProps> = ({ items, quests }) => {
  useEffect(migrateLocalInput, [])
  const { t } = useTranslation('farming')
  const { tree } = useQuestTree(quests)
  const questIds = quests.map(({ id }) => id)
  const initialItemCounts = useMemo(
    () => Object.fromEntries(items.map((item) => [item.id, ''])),
    [items]
  )
  const [objective, setObjective] = useLocalStorage('objective', 'ap')
  const [itemCounts, setItemCounts] = useLocalStorage(
    'items',
    initialItemCounts
  )
  const [checkedQuests, setCheckedQuests] = useLocalStorage('quests', questIds)
  const [halfDailyAp, setHalfDailyAp] = useLocalStorage('halfDailyAp', false)
  const [dropMergeMethod, setDropMergeMethod] = useLocalStorage(
    'dropMergeMethod',
    'add'
  )
  const router = useRouter()
  const [isConfirming, setIsConfirming] = useBoolean()
  const [isLoading, setIsLoading] = useBoolean(false)
  const [selected, setSelected] = useChecked(
    questIds,
    checkedQuests,
    setCheckedQuests
  )
  const { checked, onCheck, expanded, onExpand } = useCheckboxTree(
    tree,
    selected,
    setSelected
  )

  useEffect(() => {
    const { query } = router
    if (isInputState(query)) {
      setObjective((objective) => query.objective ?? objective)
      setItemCounts(
        (itemCounts) =>
          Object.fromEntries(
            query.items
              .split(',')
              .map((itemCount) => itemCount.split(':', 2) as [string, string])
          ) ?? itemCounts
      )
      setCheckedQuests((checkedQuests) => {
        const { quests } = query
        if (quests == null) {
          return checkedQuests
        } else {
          return questIds.filter(
            (id) =>
              quests.includes(id[0]) ||
              quests.includes(id.slice(0, 2)) ||
              quests.includes(id)
          )
        }
      })
      setHalfDailyAp(query.ap_coefficients == '0:0.5')
      setDropMergeMethod(query.drop_merge_method ?? 'add')
      router
        .replace('/farming', undefined, { scroll: false, shallow: true })
        .catch((error) => console.error(error))
    }
  }, [
    questIds,
    router,
    setCheckedQuests,
    setDropMergeMethod,
    setHalfDailyAp,
    setItemCounts,
    setObjective,
  ])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setIsLoading.on()
      const query = inputToQuery({
        objective,
        itemCounts,
        checkedQuests,
        halfDailyAp,
        dropMergeMethod,
      })
      const params = new URLSearchParams({ ...query, fields: 'id' })
      const apiEndpoint =
        'https://pgdz683mk2.execute-api.ap-northeast-1.amazonaws.com/fgo-farming-solver'
      const url = `${apiEndpoint}?${params.toString()}`
      const result = await fetch(url).then((res) => res.json() as unknown)
      if (hasId(result) && typeof result.id == 'string') {
        const url = `/farming/results/${result.id}`
        localStorage.setItem('farming/results', url)
        await router.push(url)
      } else {
        await router.push('/500')
      }
    },
    [
      checkedQuests,
      dropMergeMethod,
      halfDailyAp,
      itemCounts,
      objective,
      router,
      setIsLoading,
    ]
  )

  const onReset = useCallback(() => {
    setObjective('ap')
    setItemCounts(initialItemCounts)
    setCheckedQuests(questIds)
    setHalfDailyAp(false)
    setDropMergeMethod('add')
  }, [
    initialItemCounts,
    questIds,
    setCheckedQuests,
    setDropMergeMethod,
    setHalfDailyAp,
    setItemCounts,
    setObjective,
  ])

  const handleItemChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget
      setItemCounts((itemCounts) => ({ ...itemCounts, [name]: value }))
    },
    [setItemCounts]
  )
  const handleHalfDailyApChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const { checked } = event.currentTarget
      setHalfDailyAp(checked)
    },
    [setHalfDailyAp]
  )

  const itemGroups = Object.entries(
    groupBy(items, ({ largeCategory }) => largeCategory)
  ).map(([largeCategory, items]): [string, [string, Localized<Item>[]][]] => [
    largeCategory,
    Object.entries(groupBy(items, ({ category }) => category)),
  ])

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit}>
      <VStack alignItems="start" spacing={8}>
        <ObjectiveFieldset objective={objective} setObjective={setObjective} />
        <ItemFieldset
          itemGroups={itemGroups}
          inputItems={itemCounts}
          handleChange={handleItemChange}
        />
        {Object.values(itemCounts).every((count) => count == '') && (
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
        {checkedQuests.length == 0 && (
          <Alert status="error">
            <AlertIcon />
            {t('周回対象に含めるクエストを最低1つ選択してください。')}
          </Alert>
        )}
        <FormControl as="fieldset">
          <FormLabel as="legend">{t('キャンペーン')}</FormLabel>
          <Checkbox isChecked={halfDailyAp} onChange={handleHalfDailyApChange}>
            {t('修練場AP半減')}
          </Checkbox>
        </FormControl>
        <DropRateSelect
          dropMergeMethod={dropMergeMethod}
          setDropMergeMethod={setDropMergeMethod}
        />
        <ButtonGroup>
          <Button
            type="submit"
            disabled={
              Object.values(itemCounts).every((count) => count == '') ||
              checkedQuests.length == 0
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
      </VStack>
    </form>
  )
}
