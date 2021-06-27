import { Fragment } from "react"

export default function QuestTable({
    questGroups, 
    questToDrops
}: {
    questGroups: {[key: string]: {area: string, quest: string, lap: number}[]},
    questToDrops: {[key: string]: {[key: string]: string}[]}
}) {
    return (
        <table>
            <thead>
                <tr>
                    <th key="quest-header" className="left">クエスト</th>
                    <th key="lap-header" className="right">周回数</th>
                    <th key="drop-header" className="left">ドロップ</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(questGroups).map(([area, questGroup]) =>
                    <Fragment key={area}>
                        <tr key={area} className="for-mobile"><th className="left" colSpan={3}>{area}</th></tr>
                        {questGroup.map(({quest, lap}) => (
                            <tr key={quest}>
                                <td className="left">{quest}</td>
                                <td className="right">{lap}</td>
                                <td className="left">{questToDrops[quest].map((d) => (d.item + Math.round(parseFloat(d.dropRate) * lap))).join(' ')}</td>
                            </tr>
                        ))}
                    </Fragment>
                )}
            </tbody>
        </table>
    )
}