import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/accordion'
import React from 'react'
import { getLargeCategory } from '../../hooks/get-large-category'
import { Item, Params } from '../../interfaces/api'
import { groupBy } from '../../utils/group-by'
import { ItemTable } from './item-table'

export const ResultAccordion = ({
  items,
  params,
}: {
  items: Item[]
  params: Params
}) => {
  const itemGroups = groupBy(items, ({ category }) => category)
  const largeItemGroups = groupBy(Object.entries(itemGroups), ([category, _]) =>
    getLargeCategory(category)
  )
  return (
    <Accordion allowMultiple>
      {Object.entries(largeItemGroups).map(([largeCategory, itemGroups]) => (
        <AccordionItem className="item-details" key={largeCategory}>
          <h3>
            <AccordionButton>
              <AccordionIcon />
              {largeCategory}
            </AccordionButton>
          </h3>
          <AccordionPanel>
            <ItemTable itemGroups={itemGroups} itemToQuery={params.items} />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
