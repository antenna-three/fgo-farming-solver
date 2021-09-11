import Link from "next/link"
import { jpClassNames } from "../constants/jp-class-names"

const Pagination = ({
    currentClassName,
}: {
    currentClassName?: string,
}) => {
    const classNames = Object.keys(jpClassNames)
    const currentIndex = classNames.indexOf(currentClassName || '')
    const prevClassName = currentIndex < 1
        ? classNames.slice(-1)[0]
        : classNames[currentIndex - 1]
    const nextClassName = classNames[currentIndex + 1] || classNames[0]
    return (
        <div className="pagination">
            <Link href={'/material/' + prevClassName}>
                <a className="page"><span className="page prev">{jpClassNames[prevClassName]}</span></a>
            </Link>
            <Link href="/material">
                <a className="page"><span className="page top">サーヴァント選択/共通設定</span></a>
            </Link>
            <Link href={'/material/' + nextClassName}>
                <a className="page"><span className="page next">{jpClassNames[nextClassName]}</span></a>
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
                    padding: .8rem 2rem;
                    border-radius: 5px;
                }
                .page.prev {
                    padding-left: 3rem;
                }
                .page.next, .page.top{
                    padding-right: 3rem;
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
                    transform: translate(-20px, 7px) rotate(45deg);
                    border-bottom: 3px solid var(--color);
                    border-left: 3px solid var(--color);
                }
                .next::after {
                    transform: translate(6px, 7px) rotate(225deg);
                    border-bottom: 3px solid var(--color-bg);
                    border-left: 3px solid var(--color-bg);
                }
            `}</style>
        </div>
    )
}

export default Pagination