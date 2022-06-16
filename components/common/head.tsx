import NextHead from 'next/head'
import { useRouter } from 'next/router'

export const Head = ({
  title,
  children,
}: {
  title?: string
  children?: React.ReactNode
}) => {
  const { locale } = useRouter()
  const siteName = locale == 'en' ? 'FGO Farming Solver' : 'FGO周回ソルバー'
  title = (title ? title + ' | ' : '') + siteName
  return (
    <NextHead>
      <title>{title}</title>
      <link rel="icon" href="/hermes.png" type="image/png" />
      <meta httpEquiv="content-language" content="ja"></meta>
      <meta property="og:title" content={title} />
      <meta
        property="og:image"
        content={`https://${
          process.env.VERCEL_URL ?? 'fgo-farming-solver'
        }/ogp-image.png`}
      />
      <meta name="twitter:card" content="summary" />
      {children}
    </NextHead>
  )
}
