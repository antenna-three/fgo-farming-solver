import { Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { FormEventHandler, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Item } from '../../interfaces/atlas-academy'
import { toApiItemId } from '../../lib/to-api-item-id'
import { ItemLink } from '../common/item-link'

const showPositive = (value?: number) =>
  value == null || value < 0 ? '' : value
const px = [2, 4, 6]

export const ResultTable = ({
  itemGroup,
  amounts,
  possession,
  deficiencies,
  onChange,
  onFocus,
}: {
  itemGroup: [string, Item[]][]
  amounts: { [id: string]: number }
  possession: Record<string, number | undefined>
  deficiencies: { [id: string]: number }
  onChange: FormEventHandler
  onFocus: FormEventHandler
}) => {
  const { t } = useTranslation('material')

  return (
    <Table>
      <Thead>
        <Tr>
          <Th px={px}>{t('アイテム')}</Th>
          <Th px={px} isNumeric>
            {t('必要数')}
          </Th>
          <Th px={px}>{t('所持数')}</Th>
          <Th px={px} isNumeric>
            {t('不足数')}
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {itemGroup.map(([category, items]) => (
          <Fragment key={category}>
            <Tr>
              <Th px={px} colSpan={4}>
                {t(category)}
              </Th>
            </Tr>
            {items.map((item) => (
              <Tr key={item.id}>
                <Td px={px} py={3}>
                  <ItemLink name={item.name} id={toApiItemId(item)} />
                </Td>
                <Td px={px} py={3} isNumeric>
                  {amounts[item.id.toString()]}
                </Td>
                <Td px={px} py={0}>
                  <Input
                    type="number"
                    name={item.id.toString()}
                    value={showPositive(possession[item.id])}
                    min={0}
                    onChange={onChange}
                    onFocus={onFocus}
                    w={20}
                  />
                </Td>
                <Td px={px} py={3} isNumeric>
                  {showPositive(deficiencies[item.id])}
                </Td>
              </Tr>
            ))}
          </Fragment>
        ))}
      </Tbody>
    </Table>
  )
}
