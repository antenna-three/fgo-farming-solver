import dynamic from 'next/dynamic'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import styles from '../styles/checkbox-tree.module.css'
import React, { useState } from 'react'

import type { Node } from 'react-checkbox-tree'
import { Box, FormControl, FormLabel } from '@chakra-ui/react'
import {
  FaCheckSquare,
  FaRegSquare,
  FaMinusSquare,
  FaChevronDown,
  FaChevronRight,
} from 'react-icons/fa'

const CheckboxTree = dynamic(() => import('react-checkbox-tree'), {
  ssr: false,
})

export const QuestTree = ({
  tree,
  checked,
  setChecked,
}: {
  tree: Node[]
  checked: string[]
  setChecked: { (value: string[]): void }
}) => {
  const [expanded, setExpanded] = useState([] as string[])
  return (
    <>
      <FormControl as="fieldset">
        <FormLabel as="legend">周回対象に含めるクエスト</FormLabel>
        <CheckboxTree
          nodes={tree}
          checkModel="all"
          checked={checked}
          expanded={expanded}
          onCheck={setChecked}
          onExpand={setExpanded}
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
      </FormControl>
    </>
  )
}
