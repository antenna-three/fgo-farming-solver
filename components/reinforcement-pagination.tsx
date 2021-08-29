import Link from "next/link"
import { Fragment } from "react"
import { jpClassNames } from "../constants/jp-class-names"

const Pagination = ({
    currentClassName,
}: {
    currentClassName?: string,
}) => {
    const currentIndex = Object.keys(jpClassNames).indexOf(currentClassName || '')
    const prevClassName = Object.keys(jpClassNames)[currentIndex - 1] || ''
    const nextClassName = Object.keys(jpClassNames)[currentIndex + 1] || ''
    return (
        <div className="pagination">
            <div className="prev-next">
                <Link href={'/reinforcement/' + prevClassName}>
                    <a><span className="page prev">前へ</span></a>
                </Link>
                <Link href={'/reinforcement/' + nextClassName}>
                    <a><span className="page next">次へ</span></a>
                </Link>
            </div>
            <h2>ページ一覧</h2>
            <ul>
                <li>
                    <Link href="/reinforcement">
                        <a>共通設定/サーヴァント選択</a>
                    </Link>
                </li>
                <li>
                    個別設定
                    <ul>
                        {Object.entries(jpClassNames).map(([className, jpClassName]) => (
                            <Fragment key={className}>
                                {className == currentClassName
                                ? <li>{jpClassName}</li>
                                : <Link href={'/reinforcement/' + className}>
                                    <li>
                                        <a>{jpClassName}</a>
                                    </li>
                                </Link>}
                            </Fragment>
                        ))}
                    </ul>
                </li>
            </ul>
            <style jsx>{`
                .pagination > ul {
                    padding-left: 0;
                }
                li {
                    list-style: none;
                }
                li > ul {
                    padding-left: 1rem;
                }
                a {
                    cursor: pointer;
                }
                .prev-next {
                    width: fit-content;
                    margin: 5rem auto;
                }
                .page {
                    margin: 4rem;
                    padding: 1rem 2rem;
                    color: var(--color-bg);
                    background-color: var(--color);
                    border-radius: 5px;
                }
                .page.prev {
                    padding-left: 3rem;
                }
                .page.next {
                    padding-right: 3rem;
                }
                .prev::before, .next::after {
                    position: absolute;
                    content: "";
                    width: 8px;
                    height: 8px;
                    border-bottom: 3px solid var(--color-bg);
                    border-left: 3px solid var(--color-bg);
                }
                .prev::before {
                    transform: translate(-16px, 7px) rotate(45deg);
                }
                .next::after {
                    transform: translate(2px, 7px) rotate(225deg);
                }
            `}</style>
        </div>
    )
}

export default Pagination