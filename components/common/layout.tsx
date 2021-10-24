import { Box, Container, Spacer, VStack } from '@chakra-ui/react'
import React from 'react'
import { Footer } from './footer'
import { Header } from './header'

export const Layout: React.FC = ({ children, ...props }) => (
  <Box>
    <Container bg="white" maxW="container.lg" px={['5vw', 6, 12]}>
      <VStack py={4} spacing={8} alignItems="stretch" minH="100vh">
        <Header />
        <main>{children}</main>
        <Spacer />
        <Footer />
      </VStack>
    </Container>
  </Box>
)
