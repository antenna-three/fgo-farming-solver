import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useCallback, useState } from "react";
import Head from '../../components/head'
import ServantLevelSelect, { ServantState, State } from "../../components/servant-level-select";
import { createReinforcementState } from "../../lib/create-reinforcement-state";
import { useLocalStorage } from "../../lib/use-local-storage";
import { jpClassNames } from "../../constants/jp-class-names";
import Pagination from "../../components/material-pagination";
import PageList from "../../components/material-page-list"
import { Materials, Servant } from "../../interfaces";
import CalcButton from "../../components/material-calc-button";
import { getServants } from "../../lib/get-servants";
import { getMaterialsForServants } from "../../lib/get-materials";
import { getJpClassName } from "../../lib/get-jp-class-name";
import ClassTree from "../../components/class-tree";
import { createMergeState } from "../../lib/create-merge-state";
import { revalidate } from "../../constants/revalidate";


export const getStaticPaths: GetStaticPaths = async () => {
    const servants = await getServants()
    const paths = servants.map(({className}) => ({params: {className}}))
    return {paths, fallback: false}
}


export const getStaticProps: GetStaticProps = async (context) => {
    if (context.params == null) {
        return {props: {servants: null}}
    }
    const {className} = context.params
    const servants = await getServants()
    const materials = await getMaterialsForServants()
    return {props: {servants, materials, className}, revalidate}
}

export default function material({
    servants,
    materials,
    className,
}: {
    servants: Servant[],
    materials: {[id: string]: {[key: string]: Materials}},
    className: string,
}) {
    const initialState = createReinforcementState(['all', ...servants.map((servant) => (servant.id.toString()))])
    const mergeState = createMergeState(initialState)
    const [state, setState] = useLocalStorage('material', initialState, mergeState)
    const filteredServants = servants.filter(servant => servant.className == className)
    const enabledServants = filteredServants.filter(servant => !state[servant.id].disabled)
    const setServantStates = Object.fromEntries(servants.map(({id}) => ([
        id,
        useCallback((dispatch: (servantState: ServantState) => ServantState) => {
            setState(state => ({...state, [id]: {...state[id], ...dispatch(state[id])}}))
        }, [id])
    ])))
    const jpClassName = getJpClassName(className)
    const checked = Object.entries(state).filter(([id, { disabled }]) => !disabled).map(([id, { disabled }]) => (id))
    const onCheck = (ids: string[]) => setState(state => (
        { ...state, ...Object.fromEntries(Object.entries(state).map(([id, servantState]) => ([[id], { ...servantState, disabled: !ids.includes(id) }]))) }
    ))
    const [expanded, onExpand] = useState(['all'])

    return (<>
        <Head title={`${jpClassName} | 育成素材計算機`}/>
        <Link href="/material">
            <a>
                サーヴァント選択/共通設定
            </a>
        </Link>
        <details>
            <summary>個別設定</summary>
            <PageList currentClassName={className}/>
        </details>
        <ClassTree
            className={className}
            servants={filteredServants}
            checked={checked}
            expanded={expanded}
            onCheck={onCheck}
            onExpand={onExpand}
        />
        <div className="flex">
            {enabledServants.map(servant => (
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
        {enabledServants.length == 0 && <p>{jpClassNames[className]}のサーヴァントは選択されていません。</p>}
        <Pagination currentClassName={className}/>
        <CalcButton state={state} materials={materials}/>
        <style jsx>{`
            .flex {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
            .servant {
                width: 100%;
                max-width: 450px;
            }
        `}</style>
    </>)
}