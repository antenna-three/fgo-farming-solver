import { Box, Checkbox, HStack, IconButton, VStack } from '@chakra-ui/react'
import React, { FormEventHandler, memo } from 'react'
import { NodeState } from '../../hooks/use-checkbox-tree'
import { ExpandChevronIcon } from './expand-chevron'

export type Node = { label: string; value: string; children?: Node[] }

type CheckboxTreeProps = {
  tree: Node[]
  checked: NodeState
  onCheck: FormEventHandler<HTMLInputElement>
  expanded: { [value: string]: boolean }
  onExpand: FormEventHandler<HTMLButtonElement>
  debug?: boolean
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
            {expanded[value] && (
              <CheckboxTree
                tree={children}
                checked={filterObject(checked, getValues(children))}
                onCheck={onCheck}
                expanded={filterObject(expanded, getValues(children))}
                onExpand={onExpand}
              />
            )}
          </Box>
        )
      )}
    </VStack>
  )
}

const areObjectEqual = (
  prevObj: { [key: string]: unknown },
  nextObj: { [key: string]: unknown }
): boolean => JSON.stringify(prevObj) == JSON.stringify(nextObj)
//Object.entries(prevObj).every(([key, value]) => nextObj[key] === value)

const areEqual = (
  prevProps: CheckboxTreeProps,
  nextProps: CheckboxTreeProps
) => {
  const checked = areObjectEqual(prevProps.checked, nextProps.checked)
  const expanded = areObjectEqual(prevProps.expanded, nextProps.expanded)
  const tree = prevProps.tree === nextProps.tree
  if (prevProps.debug) {
    console.log(checked, expanded, tree)
  }
  return checked && expanded && tree
}

export const CheckboxTree = memo(_CheckboxTree, areEqual)
