import { GetStaticPaths, GetStaticProps } from "next"
import Link from 'next/link'
import Error from "../_error"
import Spinner from "../../components/spinner"
import { getGzip, getJSON } from "../../lib/get-s3"
import _ from "underscore"
import Head from '../../components/head'
import DropTable from "../../components/drop-table"
import { useState } from "react"
import { useLocalStorage } from "../../lib/use-local-storage"


type Item = {id: string, category: string, name: string}
type Quest = {id: string, section: string, area: string, name: string, ap: number}
type DropRate = {item_id: string, quest_id: string, drop_rate_1: number, drop_rate_2: number}
type DropRateKey = 'drop_rate_1' | 'drop_rate_2'
type DropRateStyle = 'ap' | 'rate'


export const getStaticPaths: GetStaticPaths = async () => {
    const { items } = await getGzip('all.json.gz')
    const paths = items.map(({ id }) => ( { params: { id: id as string }}))
    return {
        paths,
        fallback: true
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (params == null || !('id' in params) || typeof params.id !== 'string') {
        return { props: { statusCode: 404 }}
    }
    let {items, quests, drop_rates} = await getGzip('all.json.gz')
    const id = params.id
    const questIds = drop_rates.filter(({item_id}) => (item_id == id)).map(({quest_id}) => (quest_id))
    const filteredQuests = quests.filter(({id}) => (questIds.includes(id)))
    return {
        props: {
            id,
            items,
            quests: filteredQuests,
            dropRates: drop_rates
        },
        revalidate: 86400
    }
}


export default function Item(props?: {
    id: string,
    items: Item[],
    quests: Quest[],
    dropRates: DropRate[]
} | {
    statusCode: number
}) {
    if (props == null || Object.keys(props).length == 0) {
        return <Spinner message="読み込み中"/>
    }
    if ('statusCode' in props) {
        return <Error statusCode={props.statusCode}/>
    }
    const {id, items, quests, dropRates} = props
    const itemIndexes = _.indexBy(items, ({id}) => (id))
    const [dropRateKey, setDropRateKey] = useLocalStorage<DropRateKey>('dropRateKey', 'drop_rate_1')
    const [dropRateStyle, setDropRateStyle] = useLocalStorage<DropRateStyle>('dropRateStyle', 'ap')
    dropRates.sort(
        (a, b) => (a.item_id == id ? -1 : b.item_id == id ? 1 : parseInt(a.item_id, 36) - parseInt(b.item_id, 36))
    )
    const dropGroups = _.groupBy(dropRates, ({quest_id}) => (quest_id))
    const idToDropRate = (quest_id: string, item_id: string) => (dropGroups[quest_id].find(row => (row.item_id == item_id)) || {[dropRateKey]: 0})
    const getDropRate = (quest_id: string, item_id: string, key: DropRateKey) => (idToDropRate(quest_id, item_id)[dropRateKey] || 0)
    const selectedQuests = dropRateStyle == 'rate'
        ? quests.slice().sort((a, b) => (getDropRate(b.id, id, dropRateKey) - getDropRate(a.id, id, dropRateKey)))
        : quests.slice().sort((a, b) => (a.ap/getDropRate(a.id, id, dropRateKey) - b.ap/getDropRate(b.id, id, dropRateKey)))
    const title = itemIndexes[id].name + 'のドロップ一覧'

    return (
        <>
            <Head title={title}/>
            <p><Link href="/items"><a>アイテム一覧</a></Link> &gt; {title}</p>
            <h1>{title}</h1>
            <form className="select">
                <div>
                    <input type="radio" name="drop-rate-key" checked={dropRateKey == 'drop_rate_1'} onChange={() => {setDropRateKey('drop_rate_1')}} id="drop-rate-1"/>
                    <label htmlFor="drop-rate-1">旧データ</label>
                </div>
                <div>
                    <input type="radio" name="drop-rate-key" checked={dropRateKey == 'drop_rate_2'} onChange={() => {setDropRateKey('drop_rate_2')}} id="drop-rate-2"/>
                    <label htmlFor="drop-rate-2">新データ</label>
                </div>
            </form>
            <form className="select">
                <div>
                    <input type="radio" name="drop-rate-style" checked={dropRateStyle == 'ap'} onChange={() => {setDropRateStyle('ap')}} id="style-ap"/>
                    <label htmlFor="style-ap">AP効率</label>
                </div>
                <div>
                    <input type="radio" name="drop-rate-style" checked={dropRateStyle == 'rate'} onChange={() => {setDropRateStyle('rate')}} id="style-rate"/>
                    <label htmlFor="style-rate">ドロップ率</label>
                </div>
            </form>
            <DropTable
                itemIndexes={itemIndexes}
                quests={selectedQuests}
                dropGroups={dropGroups}
                dropRateKey={dropRateKey}
                dropRateStyle={dropRateStyle}
            />
            <style jsx>{`
                th, td {
                    font-size: 14px;
                }
                .select {
                    display: inline-block;
                    margin: .5rem;
                    padding: .5rem;
                    border: solid 1px #ccc;
                    border-radius: 5px;
                }
            `}</style>
        </>
    )
}