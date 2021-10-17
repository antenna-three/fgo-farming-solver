import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Collapse,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react'
import React, {
  EventHandler,
  FormEventHandler,
  Fragment,
  MouseEventHandler,
  useState,
} from 'react'
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
        .flatMap(([area, quests]) => quests.map(({ id }) => id))
        .map((id) => [id, false])
    )
  )
  const onToggle: FormEventHandler<HTMLButtonElement> = (event) => {
    const { value } = event.currentTarget
    setIsOpen((isOpen) => ({ ...isOpen, [value]: !isOpen[value] }))
  }

  const colSpan =
    Object.values(questToDrops).reduce(
      (acc, cur) => (cur.length > acc ? cur.length : acc),
      0
    ) * 2
  return (
    <Table whiteSpace="nowrap">
      <Thead>
        <Tr>
          <Th key="quest-header" colSpan={2}>
            クエスト
          </Th>
          <Th key="lap-header" isNumeric>
            周回数
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {Object.entries(questGroups).map(([area, questGroup]) => (
          <Fragment key={area}>
            <Tr key={area} bg="gray.100">
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
                  <Td>{name}</Td>
                  <Td isNumeric>{lap}</Td>
                </Tr>

                <Tr>
                  <Td colSpan={3} py={0}>
                    <Collapse in={isOpen[id]} animateOpacity>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Th>アイテム</Th>
                            <Th isNumeric>獲得数</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {questToDrops[id].map((d) => (
                            <Tr key={id + d.item_id}>
                              <Td>
                                <ItemLink item={itemIndexes[d.item_id]} />
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
