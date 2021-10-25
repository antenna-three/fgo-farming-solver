import React from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'
import { Head } from '../components/common/head'
import { Layout } from '../components/common/layout'
import { useLanguage } from '../hooks/use-language'

const MyApp = ({ Component, pageProps }: AppProps) => {
  useLanguage()
  return (
    <>
      <Head />
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  )
}
export default MyApp
