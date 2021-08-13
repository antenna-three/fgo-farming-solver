import Image from "next/image"
import Link from "next/link"

export default function Nav() {
    return (
        <header>
            <nav>
                <div>
                    <Link href='/'>
                        <a className="logo">
                            <div className="mark">
                                <Image
                                    src="/hermes.png"
                                    height={32}
                                    width={32}
                                    alt="site logo"
                                    layout="fixed"
                                />
                            </div>
                            <h1 className="type"><span>FGO</span><span>周回</span><span>ソルバー</span></h1>
                        </a>
                    </Link>
                </div>
                <div className="nav">
                    <ul>
                        <li>
                            <Link href='/items'>
                                <a>Items</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/news'>
                                <a>News</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/about'>
                                <a>About</a>
                            </Link>
                        </li>
                        <li>
                            <a href={`https://twitter.com/search?q=${encodeURIComponent('#FGO周回ソルバー')}&f=live`}
                                target="_blank"
                                rel="noopener noreferrer">Results↗</a>
                        </li>
                        <li>
                            <a href='#'>GitHub↗</a>
                            <ul>
                                <li>
                                    <a href='https://github.com/antenna-three/fgo-farming-solver'
                                        target="_blank"
                                        rel="noopener noreferrer">フロントエンド</a>
                                </li>
                                <li>
                                    <a href='https://github.com/antenna-three/fgo-farming-solver-api'
                                        target="_blank"
                                        rel="noopener noreferrer">API</a>
                                </li>
                                <li>
                                    <a href='https://github.com/antenna-three/fgodrop'
                                        target="_blank"
                                        rel="noopener noreferrer">データ抽出</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            <style jsx>{`
                span {
                    display: inline-block;
                }
                img {
                    vertical-align: middle;
                }
                .logo {
                    display: flex;
                    align-items: center;
                }
                .mark {
                    flex-basis: 32px;
                }
                .type {
                    margin-left: 1rem;
                    margin-right: auto;
                }
                .nav {
                    flex-shrink: 2;
                }
            `}</style>
        </header>
    )
}