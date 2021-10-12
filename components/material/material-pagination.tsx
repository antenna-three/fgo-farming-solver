import { Link } from '../common/link'
import { jpClassNames } from '../../constants/jp-class-names'
import { HStack, Stack } from '@chakra-ui/layout'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import React from 'react'
import { Box, Center, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { PageSelect } from './material-page-select'

export const Pagination = ({
  currentClassName,
}: {
  currentClassName?: string
}) => {
  const classNames = Object.keys(jpClassNames)
  const currentIndex = classNames.indexOf(currentClassName || '')
  const prevClassName =
    currentIndex < 1 ? classNames.slice(-1)[0] : classNames[currentIndex - 1]
  const nextClassName = classNames[currentIndex + 1] || classNames[0]
  return (
    <Stack
      as="nav"
      aria-label="pagination"
      direction={['column', 'row']}
      align="center"
      justify="space-between"
    >
      <Link href={'/material/' + prevClassName}>
        <HStack>
          <ChevronLeftIcon />
          <Text pr={5}>{jpClassNames[prevClassName]}</Text>
        </HStack>
      </Link>

      <Box>
        <PageSelect currentClassName={currentClassName} />
      </Box>

      <Link href={'/material/' + nextClassName}>
        <HStack>
          <Text pl={5}>{jpClassNames[nextClassName]}</Text>
          <ChevronRightIcon />
        </HStack>
      </Link>
    </Stack>
  )
}
