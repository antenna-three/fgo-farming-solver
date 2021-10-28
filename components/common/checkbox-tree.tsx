import React, { FormEventHandler, memo } from 'react'
import {
  Box,
  Checkbox,
  Collapse,
  HStack,
  IconButton,
  VStack,
} from '@chakra-ui/react'
import { NodeState } from '../../hooks/use-checkbox-tree'
import { zip } from '../../utils/group-by'
import { ExpandChevronIcon } from './expand-chevron'

export type Node = { label: string; value: string; children?: Node[] }

type CheckboxTreeProps = {
  tree: Node[]
  onCheck: FormEventHandler<HTMLInputElement>
  onExpand: FormEventHandler<HTMLButtonElement>
  checked: NodeState
  expanded: { [value: string]: boolean }
}

const getValues = (tree: Node[]): string[] =>
  tree.flatMap((node) =>
    node.children == null
      ? [node.value]
      : [node.value, ...getValues(node.children)]
  )
const filterObject = (object: { [key: string]: any }, keys: string[]) =>
  Object.fromEntries(
    Object.entries(object).filter(([key]) => keys.includes(key))
  )

const _CheckboxTree = ({
  tree,
  checked,
  onCheck,
  expanded,
  onExpand,
}: CheckboxTreeProps) => {
  return (
    <VStack align="start" my={1} spacing={1}>
      {tree.map(({ value, label, children }) =>
        children == null ? (
          <Box key={value} pl={12}>
            <Checkbox
              value={value}
              isChecked={checked[value] == true}
              onChange={onCheck}
            >
              {label}
            </Checkbox>
          </Box>
        ) : (
          <Box key={value} pl={4}>
            <HStack>
              <IconButton
                value={value}
                icon={<ExpandChevronIcon expanded={expanded[value]} />}
                onClick={onExpand}
                aria-label="Expand"
                variant="ghost"
                size="xs"
              />
              <Checkbox
                value={value}
                isChecked={checked[value] == true}
                isIndeterminate={checked[value] == 'intermediate'}
                onChange={onCheck}
              >
                {label}
              </Checkbox>
            </HStack>
            <Collapse in={expanded[value]}>
              <CheckboxTree
                tree={children}
                checked={filterObject(checked, getValues(children))}
                onCheck={onCheck}
                expanded={filterObject(expanded, getValues(children))}
                onExpand={onExpand}
              />
            </Collapse>
          </Box>
        )
      )}
    </VStack>
  )
}

const areTreesEqual = (prevTree: Node[], nextTree: Node[]): boolean =>
  zip(prevTree, nextTree).every(
    ([prevNode, nextNode]) => prevNode.label == nextNode.label
  )

const areObjectEqual = (
  prevObj: { [key: string]: any },
  nextObj: { [key: string]: any }
): boolean =>
  Object.entries(prevObj).every(([key, value]) => nextObj[key] == value)

const areEqual = (prevProps: CheckboxTreeProps, nextProps: CheckboxTreeProps) =>
  areObjectEqual(prevProps.checked, nextProps.checked) &&
  areObjectEqual(prevProps.expanded, nextProps.expanded) &&
  areTreesEqual(prevProps.tree, nextProps.tree)

export const CheckboxTree = memo(_CheckboxTree, areEqual)
