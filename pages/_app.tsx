import type { AppProps } from 'next/app'
import {
  Box,
  ChakraProvider,
  Container,
  Spacer,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { theme } from '../theme'
import { Head } from '../components/common/head'
import { Header } from '../components/common/header'
import { Footer } from '../components/common/footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <ChakraProvider theme={theme}>
        <Box>
          <Container bg="white" maxW="container.lg" px={['5vw', 6, 12]}>
            <VStack py={8} spacing={16} alignItems="stretch" minH="100vh">
              <Header />
              <main>
                <Component {...pageProps} />
              </main>
              <Spacer />
              <Footer />
            </VStack>
          </Container>
        </Box>
      </ChakraProvider>
    </>
  )
}
export default MyApp
