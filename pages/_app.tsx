import { ChakraProvider } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Head } from '../components/common/head'
import { Layout } from '../components/common/layout'
import { useLanguage } from '../hooks/use-language'
import { theme } from '../theme'

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  useLanguage()
  return (
    <>
      <Head />
      <SessionProvider session={session as Session}>
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
