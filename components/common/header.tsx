import { Flex, HStack, Spacer, Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { LangSelect } from './lang-select'
import { Logo } from './logo'
import { Nav } from './nav'

export const Header: React.FC = () => (
  <header>
    <HStack align="center">
      <Logo />
      <Spacer />
      <HStack align="center" justify="end">
        <LangSelect />
        <Nav />
      </HStack>
    </HStack>
  </header>
)
