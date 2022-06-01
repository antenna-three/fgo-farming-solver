import { Box, Checkbox, HStack, IconButton, VStack } from '@chakra-ui/react'
import React, { FormEventHandler } from 'react'
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

export const CheckboxTree = ({
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
                checked={checked}
                onCheck={onCheck}
                expanded={expanded}
                onExpand={onExpand}
              />
            )}
          </Box>
        )
      )}
    </VStack>
  )
}
