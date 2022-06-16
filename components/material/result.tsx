import { Box, Button, Checkbox, Text, VStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { FormEvent, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from '../../hooks/use-local-storage'
import { useSelectOnFocus } from '../../hooks/use-select-on-focus'
import { Item } from '../../interfaces/atlas-academy'
import { toApiItemId } from '../../lib/to-api-item-id'
import { MaterialResultProps } from '../../pages/material/result'
import { groupBy } from '../../utils/group-by'
import { Title } from '../common/title'
import { ResultAccordion } from './result-accordion'
import { TargetCategorySelect } from './target-category-select'

export const Result: NextPage<MaterialResultProps> = ({ items }) => {
  const router = useRouter()
  const initialAmounts = Object.fromEntries(
    Object.entries(router.query).map(([k, v]) => [
      k,
      parseInt(typeof v == 'string' ? v : '0') || 0,
    ])
  )
  const [amounts] = useLocalStorage('material/result', initialAmounts)
  const requiredItems = useMemo(
    () => items.filter((item) => item.id.toString() in amounts),
    [amounts, items]
  )
  const [possession, setPosession] = useLocalStorage<
    Record<string, number | undefined>
  >('posession', Object.fromEntries(requiredItems.map((item) => [item.id, 0])))
  const [hideSufficient, setHideSufficient] = useState(false)
  const { locale } = useRouter()
  const commonItems = locale == 'en' ? 'Common Items' : '強化素材'
  const [targetCategories, setTargetCategories] = useState([commonItems])
  const onChangeSufficient = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      setHideSufficient(event.currentTarget.checked)
    },
    []
  )
  const onChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const { name, valueAsNumber } = event.currentTarget
      setPosession((state) => ({
        ...state,
        [name]: isNaN(valueAsNumber) ? undefined : valueAsNumber,
      }))
    },
    [setPosession]
  )
  const deficiencies = Object.fromEntries(
    requiredItems.map((item) => [
      item.id,
      amounts[item.id.toString()] - (possession[item.id] ?? 0),
    ])
  )
  const goSolver = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault()
      const queryItems = requiredItems
        .filter(
          (item) =>
            deficiencies[item.id] > 0 &&
            toApiItemId(item) &&
            targetCategories.includes(item.largeCategory)
        )
        .map((item) => `${toApiItemId(item)}:${deficiencies[item.id]}`)
        .join(',')
      router
        .push({
          pathname: '/farming',
          query: { items: queryItems },
        })
        .catch((error) => console.error(error))
    },
    [requiredItems, router, deficiencies, targetCategories]
  )
  const sufficientItems = useMemo(
    () => requiredItems.filter(({ id }) => deficiencies[id] > 0),
    [deficiencies, requiredItems]
  )
  const displayedItems = hideSufficient ? sufficientItems : requiredItems
  const itemGroup = useMemo(
    () =>
      Object.entries(
        groupBy(displayedItems, ({ largeCategory }) => largeCategory)
      ).map(([largeCategory, items]): [string, [string, Item[]][]] => [
        largeCategory,
        Object.entries(groupBy(items, ({ category }) => category)),
      ]),
    [displayedItems]
  )
  const largeCategories = itemGroup
    .map(([largeCategory]) => largeCategory)
    .filter((largeCategory) => largeCategory != 'QP')
  const selectOnFocus = useSelectOnFocus()
  const { t } = useTranslation('material')

  return (
    <form onSubmit={goSolver}>
      <VStack spacing={8} alignItems="center">
        <Title>{t('アイテム必要数')}</Title>
        <Checkbox checked={hideSufficient} onChange={onChangeSufficient}>
          {t('不足している素材のみ表示')}
        </Checkbox>
        <Box w="xl" maxW="100vw">
          {itemGroup.length == 0 ? (
            <Text>{t('表示するアイテムがありません。')}</Text>
          ) : (
            <ResultAccordion
              itemGroup={itemGroup}
              amounts={amounts}
              possession={possession}
              deficiencies={deficiencies}
              onChange={onChange}
              onFocus={selectOnFocus}
            />
          )}
        </Box>
        <Box>
          <TargetCategorySelect
            categories={largeCategories}
            targetCategories={targetCategories}
            setTargetCategories={setTargetCategories}
          />
        </Box>
        <Button p={8} type="submit" colorScheme="blue">
          {t('クエスト周回数を求める')}
        </Button>
      </VStack>
    </form>
  )
}
