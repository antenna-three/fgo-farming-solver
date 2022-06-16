import { Table, TableProps, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { DropRate, DropRateKey, Item, Quest } from '../../interfaces/fgodrop'
import { Localized } from '../../lib/get-local-items'
import { ItemLink } from '../common/item-link'
import { DropTd } from './drop-td'

type DropRateStyle = 'ap' | 'rate'

export const DropTable = ({
  itemIndexes,
  quests,
  dropGroups,
  dropRateKey,
  dropRateStyle,
  ...rest
}: {
  itemIndexes: { [id: string]: Localized<Item> }
  quests: Quest[]
  dropGroups: { [key: string]: DropRate[] }
  dropRateKey: DropRateKey
  dropRateStyle: DropRateStyle
} & TableProps) => {
  const { t } = useTranslation('items')
  const colSpan =
    Object.values(dropGroups).reduce(
      (acc, cur) => (cur.length > acc ? cur.length : acc),
      0
    ) * 3

  return (
    <Table {...rest}>
      <Thead>
        <Tr>
          <Th>{t('エリア')}</Th>
          <Th>{t('クエスト')}</Th>
          <Th isNumeric>{t('サンプル数')}</Th>
          <Th colSpan={colSpan}>
            {t('ドロップ')} ({dropRateStyle == 'rate' ? '%' : 'AP/個'})
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {quests.map((quest) => {
          const samples = quest[`samples_${dropRateKey}`]
          return (
            <Tr key={quest.id}>
              <Td>{quest.area}</Td>
              <Td>{quest.name}</Td>
              <Td isNumeric>{samples ?? '-'}</Td>
              {dropGroups[quest.id].map((row) => (
                <Fragment key={row.item_id}>
                  <Td pr={0}>
                    <ItemLink
                      id={row.item_id}
                      name={itemIndexes[row.item_id].name}
                    />
                  </Td>
                  <DropTd
                    dropRate={row[`drop_rate_${dropRateKey}`]}
                    dropRateStyle={dropRateStyle}
                    ap={quest.ap}
                    samples={samples}
                  />
                </Fragment>
              ))}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
