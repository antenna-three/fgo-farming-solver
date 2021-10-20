import {
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { DropRateKey } from '../../interfaces/fgodrop'

export const DropRateKeyRadio = ({
  dropRateKey,
  setDropRateKey,
}: {
  dropRateKey: DropRateKey
  setDropRateKey: Dispatch<SetStateAction<DropRateKey>>
}) => (
  <FormControl as="fieldset">
    <FormLabel as="legend">ドロップ率</FormLabel>
    <RadioGroup
      value={dropRateKey}
      onChange={(value) => {
        setDropRateKey(value as DropRateKey)
      }}
    >
      <HStack>
        <Radio value="1">旧データ</Radio>
        <Radio value="2">新データ</Radio>
      </HStack>
    </RadioGroup>
  </FormControl>
)
