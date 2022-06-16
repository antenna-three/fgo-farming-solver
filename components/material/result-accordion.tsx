import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react'
import React, { FormEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { Item } from '../../interfaces/atlas-academy'
import { ResultTable } from './result-table'

export const ResultAccordion = ({
  itemGroup,
  amounts,
  possession,
  deficiencies,
  onChange,
  onFocus,
}: {
  itemGroup: [string, [string, Item[]][]][]
  amounts: { [id: string]: number }
  possession: Record<string, number | undefined>
  deficiencies: { [id: string]: number }
  onChange: FormEventHandler
  onFocus: FormEventHandler
}) => {
  const { t } = useTranslation('common')
  return (
    <Accordion
      defaultIndex={[
        itemGroup.findIndex(([category]) => category == '強化素材'),
      ]}
      allowMultiple
    >
      {itemGroup.map(([category, subItemGroup]) => (
        <AccordionItem key={category}>
          <AccordionButton>
            <AccordionIcon />
            <Text>{t(category)}</Text>
          </AccordionButton>
          <AccordionPanel px={0}>
            <ResultTable
              amounts={amounts}
              deficiencies={deficiencies}
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
