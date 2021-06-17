import { GetServerSideProps } from "next";
import { callApi } from "../lib/call-api";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const result = await callApi(query)
    return { props: {...result, query} }
}

export default function Result({
    quest_laps,
    item_counts
}: {
    quest_laps: {[key: string]: number},
    item_counts: {[key: string]: number}
}) {
    const questLaps = quest_laps
    const itemCounts = item_counts
    return (
        <main>
        <section>
            <header>
                <h1>計算結果</h1>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>クエスト名</th>
                        <th>周回数</th>
                    </tr>
                </thead>
                <tbody>
                {Object.entries(questLaps).map(([quest, lap]) => (
                    <tr>
                        <td>{quest}</td>
                        <td>{lap}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </section>
        </main>
    )
}