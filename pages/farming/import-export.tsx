import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Head } from '../../components/common/head'

export default function ImportExport() {
  const router = useRouter()
  const initialState = {
    objective: '',
    items: '',
    quests: '',
  }
  const [query, setQuery] = useState(initialState)

  useEffect(() => {
    setQuery({ ...initialState, ...router.query })
  })

  return (
    <>
      <Head title="入力内容のインポート・エクスポート" />
      <h1>入力内容のインポート・エクスポート</h1>
      <p>フォームの入力内容を他のデバイスやブラウザとやり取りできます。</p>
      <h2>他のデバイスへのエクスポート</h2>
      <p>
        ChromeやSafariなど、ブックマーク同期機能を持ったブラウザでこのページをブックマークしてください。
      </p>
      <p>
        その後、入力データを開きたいデバイスでブックマークを開いてください。
      </p>
      <h2>他のブラウザへのエクスポート</h2>
      <p>このページのURLをコピーして、他のブラウザに貼り付けてください。</p>
      <h2>入力内容のインポート</h2>
      <p>
        <Link href={{ pathname: '/farming', query: query }}>
          <a>こちら</a>
        </Link>
        から入力フォームへ戻ってください。
      </p>
    </>
  )
}
