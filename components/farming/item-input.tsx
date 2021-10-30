import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { HStack, Input } from '@chakra-ui/react'
import React from 'react'

export const ItemInput = ({
  id,
  name,
  inputValues,
  handleChange,
}: {
  id: string
  name: string
  inputValues: { [key: string]: string }
  handleChange: React.FormEventHandler
}) => {
  inputValues[id] ||= ''
  return (
    <FormControl id={`item-${id}`}>
      <HStack align="center" justify="end">
        <FormLabel textAlign="right" fontWeight="normal">
          {name}
        </FormLabel>
        <Input
          type="number"
          inputMode="numeric"
          name={id}
          value={inputValues[id]}
          min={0}
          step={1}
          onChange={handleChange}
          w="5em"
        />
      </HStack>
    </FormControl>
  )
}
