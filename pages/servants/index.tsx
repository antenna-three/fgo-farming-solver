import { GetStaticProps } from "next";
import Link from 'next/link'
import _ from 'underscore'
import { Servant } from "../../interfaces";
import { getJpClassName } from "../../lib/get-jp-class-name";
import { getServants } from "../../lib/get-servants";


export const getStaticProps: GetStaticProps = async () => {
    const servants = await getServants()
    const servantGroups = _.groupBy(servants, servant => servant.className)
    return {props: {servantGroups}, revalidate: 3600}
}

export default function Servants({
    servantGroups
}: {
    servantGroups: {
        [key: string]: Servant[]
    }
}) {
    return (<>
        <div className="flex">
            {Object.entries(servantGroups).map(([className, servants]) => (
                <div className="flex-child" key={className}>
                    <h2>{getJpClassName(className)}</h2>
                    <ul>
                        {servants.map(servant => (
                            <li key={servant.id}>
                                <Link href={'/servants/' + servant.id}>
                                    <a>{servant.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <style jsx>{`
                .flex {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }
                .flex-child {
                    margin-right: 1rem;
                }
                ul {
                    list-style: none;
                    padding-left: 0;
                }
            `}</style>
        </div>
    </>)
}