import { Link } from '../common/link'
import { HStack, Stack } from '@chakra-ui/layout'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { PageSelect } from './material-page-select'
import { classNames } from '../../lib/class-names'
import { useRouter } from 'next/router'

export const Pagination = ({
  currentClassName,
}: {
  currentClassName?: string
}) => {
  const { locale } = useRouter()
  const localClassNames = classNames[locale ?? 'ja']
  const keys = Object.keys(localClassNames)
  const currentIndex = keys.indexOf(currentClassName || '')
  const prevClassName =
    currentIndex < 1 ? keys.slice(-1)[0] : keys[currentIndex - 1]
  const nextClassName = keys[currentIndex + 1] ?? localClassNames[0]
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
          <Text pr={5}>{localClassNames[prevClassName]}</Text>
        </HStack>
      </Link>

      <Box>
        <PageSelect currentClassName={currentClassName} />
      </Box>

      <Link href={'/material/' + nextClassName}>
        <HStack>
          <Text pl={5}>{localClassNames[nextClassName]}</Text>
          <ChevronRightIcon />
        </HStack>
      </Link>
    </Stack>
  )
}
