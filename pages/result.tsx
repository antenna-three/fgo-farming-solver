import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Error from 'next/error'
import _ from 'underscore'
import QuestTable from '../components/quest-table'
import { getS3 } from '../lib/get-s3'
import { getLargeCategory } from '../lib/get-large-category'
import SumTable from '../components/sum-table'
import ItemTable from '../components/item-table'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const questsPromise = getS3('quests.csv')
    const dropsPromise = getS3('drop_rates.csv')
    const [quests, drops] = await Promise.all([questsPromise, dropsPromise])
    return {
        props: {quests, drops}
    }
}

export default function Result({quests, drops}: {quests: any, drops: any}) {
    const router = useRouter()
    const query = router.query

    if (! ('quests' in query && 'items' in query && 'queries' in query)) {
        return (
            <Error statusCode={405} />
        )
    }

    const queryQuests = query.quests as string
    const queryItems = query.items as string
    const queryQueries = query.queries as string

    const laps = queryQuests.split(',').map((queryQuest) => {
        const [area, quest, lap] = queryQuest.split('_')
        return {area, quest, lap:parseInt(lap)}
    })

    const items = queryItems.split(',').map((queryItem) => {
        const [category, item, count] = queryItem.split('_')
        return {category, item, count: parseInt(count)}
    })

    const queries = queryQueries.split(',').map((queryQuery) => {
        const [item, count] = queryQuery.split(':')
        return {item, count: parseInt(count)}
    })

    const lapGroups = _.groupBy(laps, (lap) => (lap.area))
    const itemGroups = _.groupBy(items, item => item.category)
    const largeItemGroups = _.groupBy(Object.entries(itemGroups), ([category, _]) => getLargeCategory(category))

    const questToDrops = _.groupBy(drops, (drop) => (drop.quest))
    const questToInfo = quests.reduce((acc: {[key: string]: Object}, cur: {quest: string}) => {
        acc[cur.quest] = cur
        return acc
    }, {})
    const itemToQuery = queries.reduce((acc: {[key: string]: number}, cur: {item: string, count: number}) => {
        acc[cur.item] = cur.count
        return acc
    }, {})

    const totalAp = laps.map(({quest, lap}) => (lap * questToInfo[quest].AP)).reduce((acc, cur) => (acc + cur))

    return (
        <>
            <Head><title>計算結果 | FGO周回ソルバー</title></Head>
            <header>
                <h1>計算結果</h1>
            </header>
            <section>
                <header>
                    <h2>クエスト周回数</h2>
                </header>
                <QuestTable questGroups={lapGroups} questToDrops={questToDrops}/>
            </section>
            <section>
                <header><h2>合計</h2></header>
                <SumTable rows={[
                    {key: '周回数', value: laps.map(lap => lap.lap).reduce((acc, cur) => (acc + cur)), unit: '周'},
                    {key: 'AP', value: totalAp, unit: 'AP'},
                    {key: '聖晶石', value: Math.ceil(totalAp / 144), unit: '個'},
                    {key: '費用', value: (totalAp / 144 / 168).toFixed(1), unit: '万円'}
                ]}/>
            </section>
            <section>
                <header>
                    <h2>アイテム獲得数</h2>
                </header>
                {Object.entries(largeItemGroups).map(([largeCategory, itemGroups]) => (
                    <details key={largeCategory} open={largeCategory=="強化素材"}>
                        <summary>{largeCategory}</summary>
                        <ItemTable itemGroups={itemGroups} itemToQuery={itemToQuery}/>
                    </details>
                ))}
            </section>
            <style jsx>{`
                details {
                    width: 16rem;
                }
                dt {
                    float: left;
                    width: 5rem;
                    font-weight: bold;
                }
                dd {
                    margin-left: 5rem;
                }
            `}</style>
        </>
    )
}