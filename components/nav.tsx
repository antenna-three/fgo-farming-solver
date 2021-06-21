import Image from "next/image"
import Link from "next/link"

export default function Nav() {
    return (
        <header>
            <nav>
                <Link href='/'>
                    <a className="nav">
                    <Image
                        src="/hermes.svg"
                        height={32}
                        width={32}
                        alt="site logo"
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
                </ul>
            </nav>
        </header>
    )
}