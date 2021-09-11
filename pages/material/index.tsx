import { GetStaticProps } from "next"
import { getServants } from "../../lib/get-servants"
import { SetStateAction, useState } from "react"
import Head from "../../components/head"
import Pagination from "../../components/material-pagination"
import PageList from "../../components/material-page-list"
import ServantLevelSelect, { ServantState } from "../../components/servant-level-select"
import ServantTree from "../../components/servant-tree"
import { Item, Materials, Servant } from "../../interfaces"
import { createReinforcementState } from "../../lib/create-reinforcement-state"
import { useLocalStorage } from "../../lib/use-local-storage"
import CalcButton from "../../components/material-calc-button"
import { getServantMaterials } from "../../lib/get-materials"
import { getItems } from "../../lib/get-items"
import MsIo from "../../components/ms-io"


export const getStaticProps: GetStaticProps = async (context) => {
    const servants = await getServants()
    const materials = await getServantMaterials()
    const items = await getItems()
    return { props: { servants, materials, items }, revalidate: 3600 }
}

const Index = ({
    servants,
    materials,
    items,
}: {
    servants: Servant[],
    materials: {[id: string]: {[key: string]: Materials}},
    items: Item[],
}) => {
    const initialState = createReinforcementState(['all', ...servants.map(servant => servant.id.toString())])
    const [state, setState] = useLocalStorage('material', initialState)
    const setAllStateFunction = (dispatch: (prevServantState: ServantState) => ServantState) => {
        setState((prevState) => {
            const nextState = Object.fromEntries(Object.entries(prevState).map(([id, prevServantState]) => (
                [id, dispatch(prevServantState)]
            )))
            return nextState
        })
    }
    const setAllState = (s: SetStateAction<ServantState>) => {
        typeof (s) == 'function' ? setAllStateFunction(s) : setAllStateFunction(p => s)
    }
    const checked = Object.entries(state).filter(([id, { disabled }]) => !disabled).map(([id, { disabled }]) => (id))
    const onCheck = (ids: string[]) => setState(state => (
        { ...state, ...Object.fromEntries(Object.entries(state).map(([id, servantState]) => ([[id], { ...servantState, disabled: !ids.includes(id) }]))) }
    ))
    const [expanded, onExpand] = useState(['all'])
    const [posession, setPosession] = useLocalStorage('posession', Object.fromEntries(items.map(item => [item.id, 0])))

    return (<>
        <Head title="育成素材計算機" />
        <PageList />
        <ServantLevelSelect
            id={'all'}
            name="全サーヴァント共通設定"
            servantState={state.all}
            setServantState={setAllState}
        />
        <h2>育成サーヴァント選択</h2>
        <ServantTree
            servants={servants}
            checked={checked}
            expanded={expanded}
            onCheck={onCheck}
            onExpand={onExpand}
        />
        <h2><a href="http://fgosimulator.webcrow.jp/Material/" target="_blank" rel="noreferrer noopener">Material Simulator</a> 引継ぎコード</h2>
        <MsIo servants={servants} state={state} setState={setState} items={items} posession={posession} setPosession={setPosession}/>
        <Pagination />
        <CalcButton state={state} materials={materials}/>
    </>)
}
export default Index