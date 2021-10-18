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
}) => (
  <Box maxW={150}>
    <FormControl as="fieldset">
      <FormLabel as="legend">{category}</FormLabel>
      <VStack>
        {items.map((item) => (
          <ItemInput
            key={item.id}
            item={item}
            inputValues={inputValues}
            handleChange={handleChange}
          />
        ))}
      </VStack>
    </FormControl>
  </Box>
)
