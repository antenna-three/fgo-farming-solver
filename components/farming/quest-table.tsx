import { Table, Thead, Tr, Th, Tbody, Td, Box } from '@chakra-ui/react'
import React, { Fragment } from 'react'
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
  const colSpan =
    Object.values(questToDrops).reduce(
      (acc, cur) => (cur.length > acc ? cur.length : acc),
      0
    ) * 2
  return (
    <Box overflowX="scroll">
      <Table whiteSpace="nowrap">
        <Thead>
          <Tr>
            <Th key="quest-header">クエスト</Th>
            <Th key="lap-header" isNumeric>
              周回数
            </Th>
            <Th key="drop-header" colSpan={colSpan}>
              ドロップ
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(questGroups).map(([area, questGroup]) => (
            <Fragment key={area}>
              <Tr key={area} bg="gray.100">
                <Th colSpan={colSpan + 2}>{area}</Th>
              </Tr>
              {questGroup.map(({ name, id, lap }) => (
                <Tr key={id}>
                  <Td>{name}</Td>
                  <Td isNumeric>{lap}</Td>
                  {questToDrops[id].map((d) => (
                    <Fragment key={id + d.item_id}>
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
                    </Fragment>
                  ))}
                </Tr>
              ))}
            </Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
