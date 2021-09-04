import Link from "next/link"
import { Fragment } from "react"
import { jpClassNames } from "../constants/jp-class-names"

const Pagination = ({
    currentClassName,
}: {
    currentClassName?: string,
}) => {
    const classNames = Object.keys(jpClassNames)
    const currentIndex = classNames.indexOf(currentClassName || '')
    const prevClassName = currentIndex == -1
        ? classNames.slice(-1)[0]
        : currentIndex == 0
        ? ''
        : classNames[currentIndex - 1]
    const nextClassName = classNames[currentIndex + 1] || ''
    return (
        <div className="pagination">
            <Link href={'/material/' + prevClassName}>
                <a className="page"><span className="page prev">{jpClassNames[prevClassName] || '全サーヴァント'}</span></a>
            </Link>
            <Link href={'/material/' + nextClassName}>
                <a className="page"><span className="page next">{jpClassNames[nextClassName] || '全サーヴァント'}</span></a>
            </Link>
            <style jsx>{`
                .pagination {
                    margin: 2rem 0;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }
                .page {
                    margin: 1rem 0;
                    padding: .5rem 1rem;
                    border-radius: 5px;
                }
                .page.prev {
                    padding-left: 2rem;
                }
                .page.next {
                    padding-right: 2rem;
                    color: var(--color-bg);
                    background-color: var(--color);
                }
                .prev::before, .next::after {
                    position: absolute;
                    content: "";
                    width: 8px;
                    height: 8px;
                }
                .prev::before {
                    transform: translate(-16px, 7px) rotate(45deg);
                    border-bottom: 3px solid var(--color);
                    border-left: 3px solid var(--color);
                }
                .next::after {
                    transform: translate(2px, 7px) rotate(225deg);
                    border-bottom: 3px solid var(--color-bg);
                    border-left: 3px solid var(--color-bg);
                }
            `}</style>
        </div>
    )
}

export default Pagination