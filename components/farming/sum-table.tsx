import { Table, Tbody, Tr, Td } from '@chakra-ui/react'
import React from 'react'

export const SumTable = ({
  rows,
}: {
  rows: { key: string; value: number | string; unit: string }[]
}) => (
  <Table>
    <Tbody>
      {rows.map(({ key, value, unit }) => (
        <Tr key={key}>
          <Td>{key}</Td>
          <Td isNumeric>{value}</Td>
          <Td>{unit}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
)
