import Link from 'next/link'
import { Fragment } from 'react'
import { jpClassNames } from '../constants/jp-class-names'

const PageList = ({
    currentClassName,
}: {
    currentClassName?: string,
}) => {
    return (<>
        <h2>ページ一覧</h2>
        <ul>
            <li>
                <Link href="/material">
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
                            : <Link href={'/material/' + className}>
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
            ul {
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
        `}</style>
    </>)
}
export default PageList