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
                            <a>About</a>
                        </Link>
                    </li>
                    <li>
                        <a href='https://github.com/antenna-three'>GitHub</a>
                        <ul>
                            <li>
                                <a href='https://github.com/antenna-three/fgo-farming-solver'>Front end</a>
                            </li>
                            <li>
                                <a href='https://github.com/antenna-three/fgo-farming-solver-api'>API</a>
                            </li>
                            <li>
                                <a href='https://github.com/antenna-three/fgo-farming-solver'>Data extraction</a>
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