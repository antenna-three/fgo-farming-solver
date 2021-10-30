import {
  Table,
  Thead,
  Tr,
  Tbody,
  Th,
  Td,
  Collapse,
  IconButton,
} from '@chakra-ui/react'
import React, { FormEventHandler, Fragment, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DropRate, Item, Quest } from '../../interfaces/api'
import { groupBy } from '../../utils/group-by'
import { ExpandChevronIcon } from '../common/expand-chevron'
import { QuestItemTable } from './quest-item-table'

export const QuestTable = ({
  items,
  quests,
  dropRates,
}: {
  items: Item[]
  quests: Quest[]
  dropRates: DropRate[]
}) => {
  const itemIndexes = useMemo(
    () => Object.fromEntries(items.map((item) => [item.id, item])),
    [items]
  )
  const questGroups = useMemo(
    () => groupBy(quests, ({ area }) => area),
    [quests]
  )
  const questToDrops = useMemo(
    () => groupBy(dropRates, ({ quest_id }) => quest_id),
    [dropRates]
  )

  const [isOpen, setIsOpen] = useState(
    Object.fromEntries(
      Object.entries(questGroups)
        .flatMap(([, quests]) => quests.map(({ id }) => id))
        .map((id) => [id, false])
    )
  )
  const onToggle: FormEventHandler<HTMLButtonElement> = (event) => {
    const { value } = event.currentTarget
    setIsOpen((isOpen) => ({ ...isOpen, [value]: !isOpen[value] }))
  }
  const { t } = useTranslation('farming')

  return (
    <Table whiteSpace="nowrap">
      <Thead>
        <Tr>
          <Th key="quest-header" colSpan={2}>
            {t('クエスト')}
          </Th>
          <Th key="lap-header" isNumeric>
            {t('周回数')}
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {Object.entries(questGroups).map(([area, questGroup]) => (
          <Fragment key={area}>
            <Tr key={area}>
              <Th colSpan={3}>{area}</Th>
            </Tr>
            {questGroup.map(({ name, id, lap }) => (
              <Fragment key={id}>
                <Tr>
                  <Td px={1} py={0}>
                    <IconButton
                      aria-label="toggle collapse"
                      icon={<ExpandChevronIcon expanded={isOpen[id]} />}
                      variant="ghost"
                      value={id}
                      onClick={onToggle}
                    />
                  </Td>
                  <Td px={1}>{name}</Td>
                  <Td isNumeric>{lap}</Td>
                </Tr>

                <Tr>
                  <Td colSpan={3} py={0}>
                    <Collapse in={isOpen[id]} animateOpacity>
                      <QuestItemTable
                        dropRates={questToDrops[id]}
                        itemIndexes={itemIndexes}
                        lap={lap}
                      />
                    </Collapse>
                  </Td>
                </Tr>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </Tbody>
    </Table>
  )
}
