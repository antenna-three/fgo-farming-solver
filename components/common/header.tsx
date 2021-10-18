import { Flex, Spacer } from '@chakra-ui/react'
import React from 'react'
import { Logo } from './logo'
import { Nav } from './nav'

export const Header: React.FC = () => (
  <header>
    <Flex align="center">
      <Logo />
      <Spacer />
      <Nav />
    </Flex>
  </header>
)
