import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/accordion'
import React from 'react'
import { Item, Params } from '../../interfaces/api'
import { Localized } from '../../lib/get-local-items'
import { groupBy } from '../../utils/group-by'
import { ItemTable } from './item-table'

export const ResultAccordion = ({
  items,
  params,
}: {
  items: Localized<Item>[]
  params: Params
}) => {
  const itemGroups = Object.entries(
    groupBy(items, ({ largeCategory }) => largeCategory)
  ).map(([largeCategory, items]): [string, [string, Localized<Item>[]][]] => [
    largeCategory,
    Object.entries(groupBy(items, ({ category }) => category)),
  ])

  return (
    <Accordion allowMultiple>
      {itemGroups.map(([largeCategory, itemGroups]) => (
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
