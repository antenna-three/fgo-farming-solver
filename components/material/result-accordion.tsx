import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react'
import React, { FormEventHandler } from 'react'
import { Item } from '../../interfaces/atlas-academy'
import { ResultTable } from './result-table'

export const ResultAccordion = ({
  itemGroup,
  hideSufficient,
  amounts,
  possession,
  deficiencies,
  onChange,
  onFocus,
}: {
  itemGroup: [string, [string, Item[]][]][]
  hideSufficient: boolean
  amounts: { [id: string]: number }
  possession: { [id: string]: number }
  deficiencies: { [id: string]: number }
  onChange: FormEventHandler
  onFocus: FormEventHandler
}) => {
  return (
    <Accordion
      defaultIndex={[
        itemGroup.findIndex(([category, _]) => category == '強化素材'),
      ]}
      allowMultiple
    >
      {itemGroup.map(([category, subItemGroup]) => (
        <AccordionItem key={category}>
          <AccordionButton>
            <AccordionIcon />
            <Text>{category}</Text>
          </AccordionButton>
          <AccordionPanel px={0}>
            <ResultTable
              amounts={amounts}
              deficiencies={deficiencies}
              hideSufficient={hideSufficient}
              itemGroup={subItemGroup}
              onChange={onChange}
              onFocus={onFocus}
              possession={possession}
            />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
