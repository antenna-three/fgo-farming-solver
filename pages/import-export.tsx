import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Head from '../components/head'

export default function ImportExport() {
    const router = useRouter()
    return (
        <>
            <Head title="入力内容のインポート・エクスポート"/>
            <header>
                <Image
                    src="/graph.svg"
                    width={240}
                    height="auto"
                />
                <h1>入力内容のインポート・エクスポート</h1>
                <p>フォームの入力内容を他のデバイスやブラウザとやり取りできます。</p>
            </header>
            <article>
                <h2>他のデバイスへのエクスポート</h2>
                <p>ChromeやSafariなど、ブックマーク同期機能を持ったブラウザでこのページをブックマークしてください。</p>
                <p>その後、入力データを開きたいデバイスでブックマークを開いてください。</p>
                <h2>他のブラウザへのエクスポート</h2>
                <p>このページのURLをコピーして、他のブラウザに貼り付けてください。</p>
                <h2>入力内容のインポート</h2>
                <p>
                    <Link
                        href={{pathname: "/", query: router.query}}
                    >
                        <a>こちら</a>
                    </Link>
                    から入力フォームへ戻ってください。
                </p>
                <textarea>{JSON.stringify(router.query)}</textarea>
            </article>
        </>
    )
}