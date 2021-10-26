import { Flex, HStack, Spacer } from '@chakra-ui/react'
import React from 'react'
import { LangSelect } from './lang-select'
import { Logo } from './logo'
import { Nav } from './nav'

export const Header: React.FC = () => (
  <header>
    <HStack align="center">
      <Logo />
      <Spacer />
      <Flex wrap="wrap" justify="end">
        <LangSelect />
        <Nav />
      </Flex>
    </HStack>
  </header>
)
