import React, { FormEvent, useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Checkbox, Text, VStack } from '@chakra-ui/react'
import { useLocalStorage } from '../../hooks/use-local-storage'
import { Link } from '../common/link'
import { ResultAccordion } from './result-accordion'
import { TargetCategorySelect } from './target-category-select'
import { groupBy } from '../../utils/group-by'
import { useSelectOnFocus } from '../../hooks/use-select-on-focus'
import { Title } from '../common/title'
import { priorityToApiId } from '../../lib/priority-to-api-id'
import { NextPage } from 'next'
import { MaterialResultProps } from '../../pages/material/result'
import { useTranslation } from 'react-i18next'
import { Item } from '../../interfaces/atlas-academy'

export const Result: NextPage<MaterialResultProps> = ({ items }) => {
  const router = useRouter()
  const amounts = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(router.query)
          .filter(([k, v]) => typeof v == 'string')
          .map(([k, v]) => [k, parseInt(v as string)])
      ),
    [router.query]
  )
  const filteredItems = useMemo(
    () => items.filter((item) => item.id.toString() in amounts),
    [amounts, items]
  )
  const [possession, setPosession] = useLocalStorage(
    'posession',
    Object.fromEntries(filteredItems.map((item) => [item.id, 0]))
  )
  const [hideSufficient, setHideSufficient] = useState(false)
  const itemGroup = useMemo(
    () =>
      Object.entries(
        groupBy(filteredItems, ({ largeCategory }) => largeCategory)
      ).map(([largeCategory, items]): [string, [string, Item[]][]] => [
        largeCategory,
        Object.entries(groupBy(items, ({ category }) => category)),
      ]),
    [filteredItems]
  )
  const largeCategories = itemGroup
    .map(([largeCategory]) => largeCategory)
    .filter((largeCategory) => largeCategory != 'QP')
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
      setPosession((state) => ({ ...state, [name]: valueAsNumber ?? 0 }))
    },
    [setPosession]
  )
  const deficiencies = Object.fromEntries(
    filteredItems.map((item) => [
      item.id,
      amounts[item.id.toString()] - possession[item.id],
    ])
  )
  const goSolver = useCallback(
    (event) => {
      event.preventDefault()
      const queryItems = filteredItems
        .filter(
          (item) =>
            deficiencies[item.id] > 0 &&
            priorityToApiId(item.priority) &&
            targetCategories.includes(item.largeCategory)
        )
        .map(
          (item) => priorityToApiId(item.priority) + ':' + deficiencies[item.id]
        )
        .join(',')
      router.push({
        pathname: '/farming',
        query: { items: queryItems },
      })
    },
    [filteredItems, router, deficiencies, targetCategories]
  )
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
              hideSufficient={hideSufficient}
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
