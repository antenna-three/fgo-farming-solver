import { CheckboxGroup, Checkbox } from '@chakra-ui/checkbox'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { HStack } from '@chakra-ui/layout'
import { StringOrNumber } from '@chakra-ui/utils'
import React from 'react'

export const TargetCategorySelect = ({
  targetCategories,
  setTargetCategories,
}: {
  targetCategories: string[]
  setTargetCategories: (targetCategories: string[]) => void
}) => {
  const categories = ['スキル石', '強化素材', 'モニュピ']
  const onChange = (a: StringOrNumber[]) => {
    setTargetCategories(a.map((v) => v.toString()))
  }
  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">周回数を求める対象</FormLabel>
      <CheckboxGroup value={targetCategories} onChange={onChange}>
        <HStack spacing={4}>
          {categories.map((category) => (
            <Checkbox key={category} value={category}>
              {category}
            </Checkbox>
          ))}
        </HStack>
      </CheckboxGroup>
    </FormControl>
  )
}
