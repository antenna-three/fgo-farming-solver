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
import { useTranslation } from 'react-i18next'
import { Item } from '../../interfaces/fgodrop'
import { Localized } from '../../lib/get-local-items'
import { ItemCategoryFieldset } from './item-category-fieldset'

export const ItemFieldset = ({
  itemGroups,
  inputItems,
  handleChange,
}: {
  itemGroups: [string, [string, Localized<Item>[]][]][]
  inputItems: { [key: string]: string }
  handleChange: React.FormEventHandler
}) => {
  const { t } = useTranslation(['common', 'farming'])

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">{t('farming:集めたいアイテムの数')}</FormLabel>
      <Accordion defaultIndex={[0]} allowMultiple>
        {itemGroups.map(([largeCategory, itemGroup]) => (
          <AccordionItem key={largeCategory}>
            <AccordionButton>
              <AccordionIcon />
              {largeCategory}
            </AccordionButton>
            <AccordionPanel>
              <Wrap align="start" justify="space-evenly">
                {itemGroup.map(([category, items]) => (
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
}
