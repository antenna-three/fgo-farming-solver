import Head from "next/head";

export default function MyHead ({title, children}: {title?: string, children?: React.ReactNode}) {
    return (
        <Head>
            <title>{title}{title ? ' | ' : ''}FGO周回ソルバー</title>
            {children}
        </Head>
    )
}