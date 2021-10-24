import { NextPage } from 'next'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useChaldeaState } from '../../hooks/use-chaldea-state'
import { getClassNode } from '../../hooks/use-servant-tree'
import { useChecked } from '../../hooks/use-checked-from-chaldea-state'
import { useCheckboxTree } from '../../hooks/use-checkbox-tree'
import { getClassName } from '../../lib/class-names'
import { MaterialProps } from '../../pages/material/[className]'
import { Link } from '../common/link'
import { Head } from '../common/head'
import { BreadcrumbLink } from '../common/breadcrumb-link'
import { CheckboxTree } from '../common/checkbox-tree'
import { CalcButton } from './material-calc-button'
import { Pagination } from './material-pagination'
import { ServantLevelSelect } from './servant-level-select'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

export const Material: NextPage<MaterialProps> = ({
  servants,
  materials,
  className,
}) => {
  const ids = servants.map(({ id }) => id.toString())
  const [chaldeaState, setChaldeaState] = useChaldeaState(ids)
  const currentClassServants = useMemo(
    () => servants.filter((servant) => servant.className == className),
    [className, servants]
  )
  const enabledServants = useMemo(
    () =>
      currentClassServants.filter(
        (servant) => !chaldeaState[servant.id].disabled
      ),
    [chaldeaState, currentClassServants]
  )
  const { locale } = useRouter()
  const localClassName = getClassName(className, locale)
  const { t } = useTranslation('material')

  const tree = useMemo(
    () => [getClassNode(className, currentClassServants, locale)],
    [className, currentClassServants, locale]
  )
  const [checked, setChecked] = useChecked(chaldeaState, setChaldeaState)
  const { onCheck, checkedTree } = useCheckboxTree(tree, checked, setChecked)

  return (
    <VStack alignItems="stretch" spacing={8}>
      <Head title={`${localClassName} | 育成素材計算機`} />
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/material">
            {t('育成素材計算機')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{localClassName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack align="stretch">
        <Heading size="md">{t('サーヴァント選択')}</Heading>
        <CheckboxTree tree={tree} checkedTree={checkedTree} onCheck={onCheck} />
      </VStack>
      <VStack align="stretch">
        <Heading size="md">{t('個別設定')}</Heading>
        <SimpleGrid minChildWidth="300px" spacing={10}>
          {enabledServants.map(({ id, name }) => (
            <VStack align="stretch" maxWidth="md" key={id}>
              <Heading fontSize="xl">
                <Link href={`/servants/${id}`}>{name}</Link>
              </Heading>
              <ServantLevelSelect
                id={id.toString()}
                servantState={chaldeaState[id.toString()]}
                setState={setChaldeaState}
              />
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
      {enabledServants.length == 0 && (
        <Text>
          {locale == 'en'
            ? ''
            : `${localClassName}のサーヴァントは選択されていません。`}
        </Text>
      )}
      <Pagination currentClassName={className} />
      <Box alignSelf="center">
        <CalcButton
          state={chaldeaState}
          materials={materials}
          colorScheme="blue"
          p={8}
        />
      </Box>
    </VStack>
  )
}
