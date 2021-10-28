import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
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
import React, { FormEventHandler, Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ItemLink } from '../common/item-link'

export const QuestTable = ({
  questGroups,
  questToDrops,
  itemIndexes,
}: {
  questGroups: {
    [key: string]: { area: string; name: string; id: string; lap: number }[]
  }
  questToDrops: {
    [key: string]: { item_id: string; drop_rate: number | string }[]
  }
  itemIndexes: { [key: string]: { id: string; name: string } }
}) => {
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
                      icon={
                        isOpen[id] ? <ChevronUpIcon /> : <ChevronDownIcon />
                      }
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
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>{t('アイテム')}</Th>
                            <Th isNumeric>{t('獲得数')}</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {questToDrops[id].map((d) => (
                            <Tr key={id + d.item_id}>
                              <Td>
                                <ItemLink
                                  id={d.item_id}
                                  name={itemIndexes[d.item_id]?.name}
                                />
                              </Td>
                              <Td isNumeric>
                                {Math.round(
                                  (typeof d.drop_rate == 'string'
                                    ? parseFloat(d.drop_rate)
                                    : d.drop_rate) * lap
                                )}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
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
