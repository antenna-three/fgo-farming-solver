import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/accordion'
import { Box, Checkbox } from '@chakra-ui/react'
import React, { FormEventHandler, memo } from 'react'
import { CheckedTree } from '../../lib/use-checkbox-tree'

type Node = { label: string; value: string; children?: Node[] }

const CheckboxTree_ = ({
  tree,
  onCheck,
  checkedTree,
}: {
  tree: Node[]
  onCheck: (value: string, checked: boolean) => void
  checkedTree: CheckedTree
}) => {
  const onChange: FormEventHandler<HTMLInputElement> = (e) =>
    onCheck(e.currentTarget.value, e.currentTarget.checked)
  return (
    <Accordion allowMultiple>
      {tree.map(({ label, value, children }) =>
        children == null ? (
          <Box ml={10} mb={1} key={value}>
            <Checkbox
              value={value}
              isChecked={checkedTree[value].checked == true}
              isIndeterminate={checkedTree[value].checked == 'intermediate'}
              onChange={onChange}
            >
              {label}
            </Checkbox>
          </Box>
        ) : (
          <AccordionItem key={value} border="none">
            <h2>
              <AccordionButton p={1}>
                <AccordionIcon />
                <Checkbox
                  value={value}
                  isChecked={checkedTree[value].checked == true}
                  isIndeterminate={checkedTree[value].checked == 'intermediate'}
                  onChange={onChange}
                  ml={2}
                >
                  {label}
                </Checkbox>
              </AccordionButton>
            </h2>
            <AccordionPanel pt={1}>
              <CheckboxTree
                tree={children}
                checkedTree={checkedTree[value].children as CheckedTree}
                onCheck={onCheck}
              />
            </AccordionPanel>
          </AccordionItem>
        )
      )}
    </Accordion>
  )
}

const areTreesEqual = (prevTree: CheckedTree, nextTree: CheckedTree): boolean =>
  Object.entries(prevTree).every(([value, { checked, children }]) => {
    const next = nextTree[value]
    if (next == null) return false
    if (children == null || next.children == null)
      return checked == next.checked
    return areTreesEqual(children, next.children)
  })

const areEqual = (
  prevProps: { checkedTree: CheckedTree },
  nextProps: { checkedTree: CheckedTree }
) => areTreesEqual(prevProps.checkedTree, nextProps.checkedTree)

export const CheckboxTree = memo(CheckboxTree_, areEqual)
