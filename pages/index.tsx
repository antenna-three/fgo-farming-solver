import Link from 'next/link'

const Index = () => {
  return (
    <>
      <section>
        <header>
          <h1>
            <span className="larger a">
              <span className="nowrap">サーヴァント</span>
              <span className="nowrap">育成目標</span>
            </span>
            <span className="nowrap">から</span>
            <span className="larger b nowrap">アイテム必要数</span>を
          </h1>
          <h1>
            <span className="larger b nowrap">アイテム必要数</span>
            <span className="nowrap">から</span>
            <span className="larger c nowrap">クエスト周回数</span>を
            <span className="nowrap">求めます</span>
          </h1>
        </header>
        <aside>
          <Link href="/material">
            <a>
              <h2>育成素材計算機</h2>
            </a>
          </Link>
          <p>育成したいサーヴァントから、必要な素材の合計を求めます。</p>
        </aside>
        <aside>
          <Link href="/farming">
            <a>
              <h2>周回ソルバー</h2>
            </a>
          </Link>
          <p>欲しい素材の数から、最も効率的なクエスト周回数を求めます。</p>
        </aside>
      </section>
      <section>
        <aside>
          <Link href="/servants">
            <a>
              <h2>サーヴァント一覧</h2>
            </a>
          </Link>
          <p>サーヴァントの育成に必要な素材を確認できます。</p>
        </aside>
        <aside>
          <Link href="/items">
            <a>
              <h2>アイテム一覧</h2>
            </a>
          </Link>
          <p>アイテムのクエストごとのドロップ率を確認できます。</p>
        </aside>
      </section>
      <section>
        <aside>
          <a
            href={`https://twitter.com/search?q=${encodeURIComponent(
              '#FGO周回ソルバー'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>みんなの結果</h2>
          </a>
          <p>Twitterに投稿された計算結果を見られます。</p>
        </aside>
      </section>
      <style jsx>{`
        .larger {
          font-size: larger;
        }
        .nowrap {
          display: inline-block;
          white-space: nowrap;
        }
        .a {
          color: #48c;
        }
        .b {
          color: #c8c;
        }
        .c {
          color: #c84;
        }
      `}</style>
    </>
  )
}
export default Index
