import { chakra, Td } from '@chakra-ui/react'
import React from 'react'
import { DropRateStyle } from './item'

export const DropTd = ({
  dropRate,
  dropRateStyle,
  ap,
  samples,
}: {
  dropRate?: number
  dropRateStyle: DropRateStyle
  ap: number
  samples: number
}) => {
  if (dropRate == null) {
    return <Td>-</Td>
  }
  const value = dropRateStyle == 'rate' ? dropRate * 100 : ap / dropRate
  const sd = Math.sqrt(dropRate / samples)
  const diff =
    dropRateStyle == 'rate'
      ? sd * 2 * 100
      : ap / dropRate - ap / (dropRate + 2 * sd)
  return (
    <>
      <Td pr={0} isNumeric>
        <chakra.span pr={1}>{value.toFixed(1)}</chakra.span>
      </Td>
      <Td color="gray.400" fontSize="xs" pl={0} isNumeric>
        ±{diff.toFixed(1)}
      </Td>
    </>
  )
}
