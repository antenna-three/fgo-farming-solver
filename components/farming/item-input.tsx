import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/react'
import React from 'react'

export const ItemInput = ({
  item,
  inputValues,
  handleChange,
}: {
  item: { name: string; id: string }
  inputValues: { [key: string]: string }
  handleChange: React.FormEventHandler
}) => {
  inputValues[item.id] ||= ''
  return (
    <FormControl id={`item-${item.id}`} whiteSpace="nowrap">
      <FormLabel
        display="inline-block"
        w={10}
        textAlign="right"
        fontWeight="normal"
      >
        {item.name}
      </FormLabel>
      <Input
        type="number"
        inputMode="numeric"
        name={item.id}
        value={inputValues[item.id]}
        min={0}
        step={1}
        onChange={handleChange}
        w={20}
      />
    </FormControl>
  )
}
