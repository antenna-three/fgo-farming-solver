import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import _ from 'underscore'
import QuestTable from '../components/quest-table'
import { getS3 } from '../lib/get-s3'
import { getLargeCategory } from '../lib/get-large-category'
import Head from '../components/head'
import SumTable from '../components/sum-table'
import ItemTable from '../components/item-table'
import TweetIntent from '../components/tweet-intent'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const itemsPromise = getS3('items.csv')
    const questsPromise = getS3('quests.csv')
    const dropsPromise = getS3('drop_rates.csv')
    const [items, quests, drops] = await Promise.all([itemsPromise, questsPromise, dropsPromise])
    
    const itemInfo = items.reduce((acc: {[key: string]: {[key: string]:string}}, cur: {[key: string]: string}) => {
        acc[cur.id] = cur
        return acc
    }, {})

    const questInfo = quests.reduce((acc: {[key: string]: {[key: string]: string}}, cur: {[key: string]: string}) => {
        acc[cur.id] = cur
        return acc
    }, {})

    const questToDrops = _.groupBy(drops, (drop) => (drop.quest_id))

    return {
        props: {itemInfo, questInfo, questToDrops},
    }
}

export default function Result({
    itemInfo,
    questInfo,
    questToDrops
}: {
    itemInfo: {[key: string]: {[key: string]: string}},
    questInfo: {[key: string]: {area: string, name: string, id: string, ap: string}},
    questToDrops: {[key: string]: {item_name: string, drop_rate: string}[]}
}) {
    const router = useRouter()
    const query = router.query

    if (! ('quests' in query && 'items' in query && 'queries' in query)) {
        return (
            <>
                <h1>フォームに内容を入力してください</h1>
                <p>このページはアイテム必要数をもとに必要なクエスト周回数を表示するページですが、アイテム必要数が入力されていないようです。</p>
                <p>アイテム必要数を<Link href="/form"><a>こちらのページ</a></Link>から入力してください。</p>
                <p>URLを編集した結果このページが表示された場合はブラウザバックしてください。</p>
            </>
        )
    }

    const queryQuests = query.quests as string
    const queryItems = query.items as string
    const queryQueries = query.queries as string

    const questLaps = queryQuests.split(',').map((queryQuest) => {
        const [id, lap] = queryQuest.split(':')
        const area = questInfo[id].area
        const name = questInfo[id].name
        return {area, name, id, lap:parseInt(lap)}
    })

    const itemCounts = queryItems.split(',').map((queryItem) => {
        const [id, count] = queryItem.split(':')
        const category = itemInfo[id].category
        const name = itemInfo[id].name
        return {category, name, id, count: parseInt(count)}
    })

    const itemToQuery = queryQueries.split(',').reduce((acc: {[key: string]: number}, cur: string) => {
        const [id, count] = cur.split(':')
        acc[id] = parseInt(count)
        return acc
    }, {})

    const lapGroups = _.groupBy(questLaps, lap => lap.area)
    const itemGroups = _.groupBy(itemCounts, item => item.category)
    const largeItemGroups = _.groupBy(Object.entries(itemGroups), ([category, _]) => getLargeCategory(category))

    const totalAp = questLaps.map(({id, lap}) => (lap * parseInt(questInfo[id].ap))).reduce((acc, cur) => (acc + cur))

    return (
        <>
            <Head title="計算結果"/>
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
                <header>
                    <h2>合計</h2>
                </header>
                <SumTable rows={[
                    {key: '周回数', value: questLaps.map(lap => lap.lap).reduce((acc, cur) => (acc + cur)), unit: '周'},
                    {key: 'AP', value: totalAp, unit: 'AP'},
                    {key: '聖晶石', value: Math.ceil(totalAp / 144), unit: '個'},
                    {key: '費用', value: (totalAp / 144 / 168).toFixed(1), unit: '万円'}
                ]}/>
            </section>
            <section>
                <TweetIntent
                    questLaps={questLaps}
                    url={`https://${process.env.VERCEL_URL}${router.asPath}`}
                />
            </section>
            <section>
                <header>
                    <h2>アイテム獲得数</h2>
                </header>
                {Object.entries(largeItemGroups).map(([largeCategory, itemGroups]) => (
                    <details key={largeCategory}>
                        <summary>{largeCategory}</summary>
                        <ItemTable itemGroups={itemGroups} itemToQuery={itemToQuery}/>
                    </details>
                ))}
            </section>
            <style jsx>{`
                .tw {
                    color: var(--color);
                }
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