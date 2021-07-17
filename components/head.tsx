import Head from "next/head";

export default function MyHead ({title, children}: {title?: string, children?: React.ReactNode}) {
    title = (title ? title + ' | ' : '') + 'FGO周回ソルバー'
    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title}/>
            <meta property="og:image" content={`https://${process.env.VERCEL_URL}/_next/image?url=%2Fhermes.png&w=64&q=75`}/>
            <meta name="twitter:card" content="summary"/>
            {children}
        </Head>
    )
}