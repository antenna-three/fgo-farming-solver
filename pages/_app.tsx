import '../styles/mvp.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import Image from 'next/image'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>
        <nav>
          <Link href='/'>
            <a className="nav">
              <Image
                src="/hermes.svg"
                height={32}
                width={32}
                alt="site logo"
              />
              <h1>FGO周回ソルバー</h1>
            </a>
          </Link>
          <ul>
            <li>
              <Link href='/about'>
                <a>About</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
