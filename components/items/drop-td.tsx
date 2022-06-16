import { Td } from '@chakra-ui/react'
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
    return (
      <>
        <Td pr={0} isNumeric>
          -
        </Td>
        <Td></Td>
      </>
    )
  }
  const value = dropRateStyle == 'rate' ? dropRate * 100 : ap / dropRate
  const sd = Math.sqrt(dropRate / samples)
  const diff =
    dropRateStyle == 'rate'
      ? sd * 2 * 100
      : (ap * 2 * sd) / (dropRate * dropRate - 4 * sd * sd)
  return (
    <>
      <Td pr={0} isNumeric>
        {value.toFixed(1)}
      </Td>
      <Td color="gray.400" fontSize="xs" pl={0} isNumeric>
        ±{diff.toFixed(1)}
      </Td>
    </>
  )
}
