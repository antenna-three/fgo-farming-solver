import { GetServerSideProps } from "next";
import { callApi } from "../lib/call-api";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query
    const result = await callApi(query)
    return { props: result }
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
        <>
        {Object.entries(questLaps).map(([quest, lap]) => (
            <p>{quest}:{ }{lap}</p>
        ))}
        </>
    )
}