import Head from 'next/head'

export default function MyHead({
  title,
  children,
}: {
  title?: string
  children?: React.ReactNode
}) {
  title = (title ? title + ' | ' : '') + 'FGO周回ソルバー'
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/hermes.png" type="image/png" />
      <meta httpEquiv="content-language" content="ja"></meta>
      <meta property="og:title" content={title} />
      <meta
        property="og:image"
        content={`https://${process.env.VERCEL_URL}/ogp-image.png`}
      />
      <meta name="twitter:card" content="summary" />
      {children}
    </Head>
  )
}
