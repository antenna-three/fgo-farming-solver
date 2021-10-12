import { Input } from '@chakra-ui/input'
import { HStack } from '@chakra-ui/layout'
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/slider'
import React from 'react'

export const RangeSliderWithInput = ({
  min,
  max,
  step,
  disabled,
  name,
  value,
  setValue,
}: {
  min: number
  max: number
  step: number
  disabled?: boolean
  name?: string
  value: number[]
  setValue: (value: number[]) => void
}) => (
  <HStack spacing={4}>
    <Input
      type="number"
      min={min}
      max={max}
      step={step}
      name={name}
      value={value[0]}
      onChange={(e) => {
        setValue([e.currentTarget.valueAsNumber, value[1]])
      }}
      disabled={disabled}
      w={100}
    />
    <RangeSlider
      min={min}
      max={max}
      value={value}
      onChange={setValue}
      isDisabled={disabled}
    >
      <RangeSliderTrack>
        <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb index={0} borderWidth={1} borderColor="inherit" />
      <RangeSliderThumb index={1} borderWidth={1} borderColor="inherit" />
    </RangeSlider>
    <Input
      type="number"
      min={min}
      max={max}
      step={step}
      name={name}
      value={value[1]}
      disabled={disabled}
      onChange={(e) => {
        setValue([value[0], e.currentTarget.valueAsNumber])
      }}
      w={100}
    />
  </HStack>
)
