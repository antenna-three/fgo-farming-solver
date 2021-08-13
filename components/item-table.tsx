import { Fragment } from 'react'
import ItemLink from './item-link'

export default function ItemTable({
    itemGroups,
    itemToQuery
}: {
    itemGroups: [string, { name: string, count: number, id: string }[]][]
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
                        <tr><th className="left" colSpan={3}>{category}</th></tr>
                        {itemGroup.map((item) => (
                            <tr key={item.id}>
                                <td className="left"><ItemLink item={item}/></td>
                                <td className="right">{item.count}</td>
                                <td className="right">{itemToQuery[item.id] || '-'}</td>
                            </tr>
                        ))}
                    </Fragment>
                ))}
            </tbody>
        </table>
    )
}