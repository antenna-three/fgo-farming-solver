import Image from "next/image"
import Link from "next/link"

export default function Nav() {
    return (
        <header>
            <nav>
                <Link href='/'>
                    <a className="nav">
                    <Image
                        src="/hermes.png"
                        height={32}
                        width={32}
                        alt="site logo"
                        layout="fixed"
                    />
                    <h1>FGO周回ソルバー</h1>
                    </a>
                </Link>
                <ul>
                    <li>
                        <Link href='/about'>
                            <a>使い方</a>
                        </Link>
                    </li>
                    <li>
                        <a
                            href={`https://twitter.com/search?q=${encodeURIComponent('#FGO周回ソルバー')}&f=live`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >みんなの結果</a>
                    </li>
                    <li>
                        <a href='#'>GitHub</a>
                        <ul>
                            <li>
                                <a href='https://github.com/antenna-three/fgo-farming-solver'>フロントエンド</a>
                            </li>
                            <li>
                                <a href='https://github.com/antenna-three/fgo-farming-solver-api'>API</a>
                            </li>
                            <li>
                                <a href='https://github.com/antenna-three/fgo-farming-solver'>データ抽出</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <style jsx>{`
                img {
                    vertical-align: middle;
                }
            `}</style>
        </header>
    )
}