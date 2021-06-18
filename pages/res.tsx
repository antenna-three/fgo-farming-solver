import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Spinner from '../components/spinner'
import { callApi } from "../lib/call-api"
import { getS3 } from '../lib/get-s3'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const quests = await getS3('quests.csv')
    return {
        props: {quests}
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

export default function Res({quests}: {quests: any}) {
    const router = useRouter()
    const query = router.query
    console.log(query)
    const parsed = parseQuery(query)
    const {data, error} = useSWR(parsed, fetcher)
    
    if (error) return <div>failed to load</div>
    if (!data) return <Spinner />

    
    const questLaps: {[key: string]:string} = data.quest_laps
    console.log(data)
    return (
        <main>
        <section>
            <header>
                <h1>計算結果</h1>
            </header>
            <table>
                <thead>
                    <tr>
                        <th className="left">エリア</th>
                        <th className="left">クエスト名</th>
                        <th className="right">周回数</th>
                    </tr>
                </thead>
                <tbody>
                {Object.entries(questLaps).map(([quest, lap]) => (
                    <tr key={quest}>
                        <td className="left">{quests.find((q: any) => q.quest == quest).area}</td>
                        <td className="left">{quest}</td>
                        <td className="right">{lap}</td>
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
        </main>
    )
    return <p>test</p>
}