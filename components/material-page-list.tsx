import Link from 'next/link'
import { Fragment } from 'react'
import { jpClassNames } from '../constants/jp-class-names'

const PageList = ({
    currentClassName,
}: {
    currentClassName?: string,
}) => {
    return (<>
        {currentClassName
        ? <Link href="/material">
            <p><a>育成素材計算機</a></p>
        </Link>
        : <h1>育成素材計算機</h1>
        }
        <details>
            <summary>クラス別設定</summary>
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
        </details>
        <style jsx>{`
            a {
                cursor: pointer;
            }
        `}</style>
    </>)
}
export default PageList