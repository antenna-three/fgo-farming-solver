import React from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'
import { Head } from '../components/common/head'
import { Layout } from '../components/common/layout'
import { useLanguage } from '../hooks/use-language'

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  useLanguage()
  return (
    <>
      <Head />
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </SessionProvider>
    </>
  )
}
export default MyApp
