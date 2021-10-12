import dynamic from 'next/dynamic'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import React from 'react'
import {
  FaCheckSquare,
  FaChevronDown,
  FaChevronRight,
  FaMinusSquare,
  FaRegSquare,
} from 'react-icons/fa'
import { Box } from '@chakra-ui/react'
import { Node } from 'react-checkbox-tree'

const CheckboxTree = dynamic(() => import('react-checkbox-tree'), {
  ssr: false,
})

export const ServantTree = ({
  tree,
  checked,
  expanded,
  onCheck,
  onExpand,
}: {
  tree: Node[]
  checked: string[]
  expanded: string[]
  onCheck: (checked: string[]) => void
  onExpand: (expanded: string[]) => void
}) => (
  <CheckboxTree
    nodes={tree}
    checked={checked}
    expanded={expanded}
    onCheck={onCheck}
    onExpand={onExpand}
    icons={{
      check: (
        <Box color="blue.500">
          <FaCheckSquare />
        </Box>
      ),
      uncheck: (
        <Box color="gray.300">
          <FaRegSquare />
        </Box>
      ),
      halfCheck: (
        <Box color="blue.500">
          <FaMinusSquare />
        </Box>
      ),
      expandOpen: (
        <Box color="gray">
          <FaChevronDown />
        </Box>
      ),
      expandClose: (
        <Box color="gray">
          <FaChevronRight />
        </Box>
      ),
    }}
    showNodeIcon={false}
  />
)
