import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import _  from 'underscore'
import ServantLevelSelect, { ServantState } from "../../components/servant-level-select";
import { createReinforcementState } from "../../lib/create-reinforcement-state";
import { useLocalStorage } from "../../lib/use-local-storage-state";
import { jpClassNames } from "../../constants/jp-class-names";
import Pagination from "../../components/reinforcement-pagination";
import { Servant } from "../../interfaces";

const origin = 'https://api.atlasacademy.io'


export const getStaticPaths: GetStaticPaths = async () => {
    const servantsUrl = origin + '/export/JP/basic_servant.json'
    const servants = await fetch(servantsUrl).then(res => res.json())
    const classNames = servants.filter(({type}: {type: string}) => type == 'normal' || type == 'heroine').map(({className}: {className: string}) => className)
    const paths = classNames.map((className: string) => ({params: {className}}))
    return {paths, fallback: false}
}


export const getStaticProps: GetStaticProps = async (context) => {
    if (context.params == null) {
        return {props: {servants: null}}
    }
    const {className} = context.params
    const servantsUrl = origin + '/export/JP/basic_servant.json'
    const classNames = Object.keys(jpClassNames)
    const servants = await fetch(servantsUrl)
        .then(res => res.json())
        .then((servants: Servant[]) => servants.filter(({type}: {type: string}) => (type == 'normal' || type == 'heroine')))
        .then(servants => servants.sort((a, b) => ((classNames.indexOf(a.className) - classNames.indexOf(b.className)) * 10 + b.rarity - a.rarity)))
    return {props: {servants, className}}
}

export default function Reinforcement({
    servants,
    className,
}: {
    servants: {
        id: number,
        name: string,
        className: string,
        rarity: number
    }[],
    className: string,
}) {
    const initialState = createReinforcementState(['all', ...servants.map((servant) => (servant.id.toString()))])
    const [state, setState] = useLocalStorage('reinforcement', initialState)
    const filteredServants = servants.filter(servant => servant.className == className).filter(servant => !state[servant.id].disabled)
    const setServantStates = Object.fromEntries(servants.map(({id}) => ([
        id,
        useCallback((dispatch: (servantState: ServantState) => ServantState) => {
            setState(state => ({...state, [id]: {...state[id], ...dispatch(state[id])}}))
        }, [id])
    ])))

    return (<>
        <div className="flex">
            {filteredServants.map(servant => (
                <div className="servant" key={servant.id}>
                    <ServantLevelSelect
                        id={servant.id.toString()}
                        name={servant.name}
                        servantState={state[servant.id.toString()]}
                        setServantState={setServantStates[servant.id]}
                    />
                </div>
            ))}
        </div>
        {filteredServants.length == 0 && <p>{jpClassNames[className]}のサーヴァントは選択されていません。</p>}
        <Pagination currentClassName={className}/>
        <style jsx>{`
            .flex {
                display: flex;
                flex-wrap: wrap;
            }
            .class-name {
                margin-right: 1rem;
            }
            .servant {
                width: 100%;
                max-width: 450px;
                margin-right: 50px;
            }
        `}</style>
    </>)
}