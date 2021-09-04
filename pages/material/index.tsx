import { GetStaticProps } from "next"
import { SetStateAction, useState } from "react"
import _ from "underscore"
import Head from "../../components/head"
import Pagination from "../../components/material-pagination"
import PageList from "../../components/material-page-list"
import ServantLevelSelect, { ServantState } from "../../components/servant-level-select"
import ServantTree from "../../components/servant-tree"
import { Servant } from "../../interfaces"
import { createReinforcementState } from "../../lib/create-reinforcement-state"
import { useLocalStorage } from "../../lib/use-local-storage-state"
import { jpClassNames } from "../../constants/jp-class-names"
import CalcButton from "../../components/material-calc-button"

const origin = 'https://api.atlasacademy.io'
const region = 'JP'

export const getStaticProps: GetStaticProps = async (context) => {
    const servantsUrl = `${origin}/export/${region}/basic_servant.json`
    const classNames = Object.keys(jpClassNames)
    const servants = await fetch(servantsUrl)
        .then(res => res.json())
        .then((servants: Servant[]) => servants.filter(({type}) => (type == 'normal' || type == 'heroine')))
        .then(servants => servants.sort((a, b) => ((classNames.indexOf(a.className) - classNames.indexOf(b.className)) * 10 + b.rarity - a.rarity)))
    return {props: {servants,}}
}

const Index = ({
    servants,
}: {
    servants: Servant[],
}) => {
    const initialState = createReinforcementState(['all', ...servants.map(servant => servant.id.toString())])
    const [state, setState] = useLocalStorage('material', initialState)
    const setAllStateFunction = (dispatch: (prevServantState: ServantState) => ServantState) => {
        setState((prevState) => {
            const nextState = Object.fromEntries(Object.entries(prevState).map(([id, prevServantState]) => (
                [id, dispatch(prevServantState)]
            )))
            console.log(nextState[100100])
            return nextState
        })
    }
    const setAllState = (s: SetStateAction<ServantState>) => {
        typeof(s) == 'function' ? setAllStateFunction(s) : setAllStateFunction(p => s)
    }
    const checked = Object.entries(state).filter(([id, {disabled}]) => !disabled).map(([id, {disabled}]) => (id))
    const onCheck = (ids: string[]) => setState(state => (
        {...state, ...Object.fromEntries(Object.entries(state).map(([id, servantState]) => ([[id], {...servantState, disabled: !ids.includes(id)}])))}
    ))
    const [expanded, onExpand] = useState(['all'])
    
    return (<>
        <Head title="育成素材計算機"/>
        <h1>育成素材計算機</h1>
        <ServantLevelSelect
            id={'all'}
            name="全サーヴァント"
            servantState={state.all}
            setServantState={setAllState}
        />
        <ServantTree
            servants={servants}
            checked={checked}
            expanded={expanded}
            onCheck={onCheck}
            onExpand={onExpand}
        />
        <Pagination/>
        <PageList/>
        <CalcButton state={state}/>
    </>)
}
export default Index