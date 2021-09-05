import '../styles/mvp.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from '../components/head'
import Nav from '../components/nav'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head/>
      <Nav/>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>
        <p>Copyright 2021 <a href="https://twitter.com/antenna_games">antenna-three</a> / Data from <a href="https://atlasacademy.io">Atlas Academy</a> and <a href="https://sites.google.com/view/fgo-domus-aurea">FGOアイテム効率劇場</a></p>
      </footer>
    </>
  )
}
export default MyApp
