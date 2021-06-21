import '../styles/mvp.css'
import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import Nav from '../components/nav'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="hermes.svg" type="image/svg+xml"/>
        <meta httpEquiv="content-language" content="ja"></meta>
      </Head>
      <Nav/>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}
export default MyApp
