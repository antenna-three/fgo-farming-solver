import { GetStaticProps } from "next";
import Link from 'next/link'
import { Fragment } from "react";
import _ from 'underscore'

const origin = 'https://api.atlasacademy.io'


export const getStaticProps: GetStaticProps = async () => {
    const servantsUrl = origin + '/export/JP/basic_servant.json'
    const servants = await fetch(servantsUrl).then(res => res.json())
    const filteredServants = servants.filter((servant: {type: string}) => servant.type == 'normal')
    const servantGroups = _.groupBy(filteredServants, servant => servant.className)
    return {props: {servantGroups}}
}

export default function Servants({
    servantGroups
}: {
    servantGroups: {
        [key: string]: {
            id: number,
            name: string,
            className: string,
            rarity: number
        }[]
    }
}) {
    return (<>
        <div className="flex">
            {Object.entries(servantGroups).map(([className, servants]) => (
                <div className="flex-child" key={className}>
                    <h2>{className}</h2>
                    <ul>
                        {servants.map(servant => (
                            <li key={servant.id}>
                                <Link href={'/servants/' + servant.id.toString()}>
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