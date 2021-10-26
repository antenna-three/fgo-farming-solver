import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { VStack } from '@chakra-ui/layout'
import { Box } from '@chakra-ui/react'
import React from 'react'
import { ItemInput } from './item-input'

export const ItemCategoryFieldset = ({
  category,
  items,
  inputValues,
  handleChange,
}: {
  category: string
  items: { name: string; id: string }[]
  inputValues: { [key: string]: string }
  handleChange: React.FormEventHandler
}) => {
  return (
    <Box>
      <FormControl as="fieldset">
        <VStack>
          <FormLabel as="legend">{category}</FormLabel>
          <VStack align="end">
            {items.map(({ id, name }) => (
              <ItemInput
                key={id}
                id={id}
                name={name}
                inputValues={inputValues}
                handleChange={handleChange}
              />
            ))}
          </VStack>
        </VStack>
      </FormControl>
    </Box>
  )
}
