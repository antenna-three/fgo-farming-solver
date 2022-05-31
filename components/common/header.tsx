import { Flex, HStack, Spacer } from '@chakra-ui/react'
import React from 'react'
import { Logo } from './logo'
import { Nav } from './nav'

export const Header = () => (
  <header>
    <HStack align="center">
      <Logo />
      <Spacer />
      <Flex wrap="wrap" justify="end">
        <Nav />
      </Flex>
    </HStack>
  </header>
)
