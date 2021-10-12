import { FormControl, FormLabel } from '@chakra-ui/form-control'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Wrap,
} from '@chakra-ui/react'
import React from 'react'
import { ItemCategoryFieldset } from './item-category-fieldset'

export const ItemFieldset = ({
  categoryGroups,
  inputItems,
  handleChange,
}: {
  categoryGroups: [string, [string, { name: string; id: string }[]][]][]
  inputItems: { [key: string]: string }
  handleChange: React.FormEventHandler
}) => (
  <FormControl as="fieldset">
    <FormLabel as="legend">集めたいアイテムの数</FormLabel>
    <Accordion defaultIndex={0}>
      {categoryGroups.map(([largeCategory, categoryGroup]) => (
        <AccordionItem key={largeCategory}>
          <AccordionButton>
            <AccordionIcon />
            {largeCategory}
          </AccordionButton>
          <AccordionPanel>
            <Wrap align="start" justify="space-evenly">
              {categoryGroup.map(([category, items]) => (
                <ItemCategoryFieldset
                  key={category}
                  category={category}
                  items={items}
                  inputValues={inputItems}
                  handleChange={handleChange}
                />
              ))}
            </Wrap>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  </FormControl>
)
