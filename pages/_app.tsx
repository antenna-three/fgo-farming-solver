import React from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { appWithTranslation } from 'next-i18next'
import { theme } from '../theme'
import { Head } from '../components/common/head'
import { Layout } from '../components/common/layout'

const MyApp = ({ Component, pageProps }: AppProps) => {
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
export default appWithTranslation(MyApp)
