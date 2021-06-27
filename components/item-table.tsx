import { Fragment } from 'react'

export default function ItemTable({
    itemGroups,
    itemToQuery
}: {
    itemGroups: [string, { item: string, count: number, id: string }[]][]
    itemToQuery: {[key: string]: number}
}) {
    return (
        <table>
            <thead>
                <tr>
                    <th className="left">アイテム</th>
                    <th className="right">獲得数</th>
                    <th className="right">必要数</th>
                </tr>
            </thead>
            <tbody>
                {itemGroups.map(([category, itemGroup]) => (
                    <Fragment key={category}>
                        <tr><th className="left" key={category} colSpan={3}>{category}</th></tr>
                        {itemGroup.map(({item, count, id}) => (
                            <tr key={item}>
                                <td className="left">{item}</td>
                                <td className="right">{count}</td>
                                <td className="right">{itemToQuery[id]}</td>
                            </tr>
                        ))}
                    </Fragment>
                ))}
            </tbody>
        </table>
    )
}