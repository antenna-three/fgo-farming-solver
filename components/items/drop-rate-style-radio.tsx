import {
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { DropRateStyle } from './item'

export const DropRateStyleRadio = ({
  dropRateStyle,
  setDropRateStyle,
}: {
  dropRateStyle: DropRateStyle
  setDropRateStyle: Dispatch<SetStateAction<DropRateStyle>>
}) => (
  <FormControl as="fieldset">
    <FormLabel as="legend">表示形式</FormLabel>
    <RadioGroup
      value={dropRateStyle}
      onChange={(value) => {
        setDropRateStyle(value as DropRateStyle)
      }}
    >
      <HStack spacing={8}>
        <Radio value="ap">AP効率</Radio>
        <Radio value="rate">ドロップ率</Radio>
      </HStack>
    </RadioGroup>
  </FormControl>
)
