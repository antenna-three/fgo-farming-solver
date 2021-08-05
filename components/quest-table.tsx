import { Fragment } from "react"

export default function QuestTable({
    questGroups, 
    questToDrops,
    itemIndexes
}: {
    questGroups: {[key: string]: {area: string, name: string, id: string, lap: number}[]},
    questToDrops: {[key: string]: {item_id: string, drop_rate: number | string}[]},
    itemIndexes: {[key: string]: {name: string}}
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
                        {questGroup.map(({name, id, lap}) => (
                            <tr key={id}>
                                <td className="left">{name}</td>
                                <td className="right">{lap}</td>
                                <td className="left">{questToDrops[id].map((d) => (itemIndexes[d.item_id].name + Math.round((typeof d.drop_rate == 'string' ? parseFloat(d.drop_rate) : d.drop_rate) * lap))).join(' ')}</td>
                            </tr>
                        ))}
                    </Fragment>
                )}
            </tbody>
        </table>
    )
}