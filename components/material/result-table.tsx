import { Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { FormEventHandler, Fragment } from 'react'
import { Item } from '../../interfaces/atlas-academy'

const showPositive = (value: number) => (value > 0 ? value : '')
const px = [2, 4, 6]

export const ResultTable = ({
  itemGroup,
  hideSufficient,
  amounts,
  possession,
  deficiencies,
  onChange,
  onFocus,
}: {
  itemGroup: [string, Item[]][]
  hideSufficient: boolean
  amounts: { [id: string]: number }
  possession: { [id: string]: number }
  deficiencies: { [id: string]: number }
  onChange: FormEventHandler
  onFocus: FormEventHandler
}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th px={px}>アイテム</Th>
          <Th px={px} isNumeric>
            必要数
          </Th>
          <Th px={px}>所持数</Th>
          <Th px={px} isNumeric>
            不足数
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {itemGroup.map(([category, items]) => (
          <Fragment key={category}>
            <Tr>
              <Th px={px} colSpan={4}>
                {category}
              </Th>
            </Tr>
            {items
              .filter((item) => !hideSufficient || deficiencies[item.id] > 0)
              .map((item) => (
                <Tr key={item.id}>
                  <Td px={px} py={3}>
                    {item.name}
                  </Td>
                  <Td px={px} py={3} isNumeric>
                    {amounts[item.id.toString()]}
                  </Td>
                  <Td px={px} py={0}>
                    <Input
                      type="number"
                      name={item.id.toString()}
                      value={possession[item.id]}
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
