import Link from 'next/link'
import { Fragment } from 'react'
import { jpClassNames } from '../constants/jp-class-names'

const PageList = ({
    currentClassName,
}: {
    currentClassName?: string,
}) => {
    return (<>
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
        <style jsx>{`
            a {
                cursor: pointer;
            }
        `}</style>
    </>)
}
export default PageList