import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Spinner from '../components/spinner'
import { getS3 } from '../lib/get-s3'
import _ from 'underscore'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const questsPromise = getS3('quests.csv')
    const dropsPromise = getS3('drop_rates.csv')
    const [quests, drops] = await Promise.all([questsPromise, dropsPromise])
    console.log(drops)
    return {
        props: {quests, drops}
    }
}

function parseQuery(query: Object) {
    return Object.entries(query)
        .filter(([item, count]) => (count != ''))
        .map(( [item, count] ) => (encodeURIComponent(item) + '=' + count))
        .join('&')
}

function fetcher(query: string) {
    const url = 'https://pgdz683mk2.execute-api.ap-northeast-1.amazonaws.com/fgo-farming-solver'
    
    return fetch(url + '?' + query)
        .then(res => res.json())
}

export default function Res({quests, drops}: {quests: any, drops: any}) {
    const router = useRouter()
    const query = router.query
    const parsed = parseQuery(query)
    const {data, error} = useSWR(parsed, fetcher)
    
    if (error) return <div>failed to load</div>
    if (!data) return <Spinner />

    if (data.message) return <div>data.message</div>

    const laps: {area: string, quest: string, lap: number}[] = data.quests
    const items: {category: string, item: string, count: number}[] = data.items

    const questToDrops = _.groupBy(drops, (drop) => (drop.quest))

    return (
        <>
            <Head><title>計算結果</title></Head>
            <header>
                <h1>計算結果</h1>
            </header>
            <section>
                <header>
                    <h1>クエスト周回数</h1>
                </header>
                <table>
                    <thead>
                        <tr>
                            <th className="left">エリア</th>
                            <th className="left">クエスト名</th>
                            <th className="right">周回数</th>
                            <th className="left">ドロップ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {laps.map(({area, quest, lap}) => (
                            <tr key={quest}>
                                <td className="left">{area}</td>
                                <td className="left">{quest}</td>
                                <td className="right">{lap}</td>
                                <td className="left">{questToDrops[quest].map((d) => (d.item + ': ' + parseInt('' + d.dropRate * lap))).join(', ')}</td>
                            </tr>
                        ))}
                    <tr>
                        <td colSpan={2}>合計</td>
                        <td className="right">{laps.map(lap => lap.lap).reduce((acc, cur, idx, src) => (acc + cur))}</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </section>
            <section>
                <header>
                    <h1>アイテム獲得数</h1>
                </header>
                <table>
                    <thead>
                        <tr>
                            <th className="left">アイテム</th>
                            <th className="right">獲得数</th>
                            <th className="right">必要数</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(({category, item, count}) => (
                            <tr key={item}>
                                <td className="left">{item}</td>
                                <td className="right">{count}</td>
                                <td className="right">{query[item]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <style jsx>{`
                .left {
                    text-align: left;
                }
                .right {
                    text-align: right;
                }
            `}</style>
        </>
    )
    return <p>test</p>
}