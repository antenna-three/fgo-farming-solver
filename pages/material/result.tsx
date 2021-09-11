import { GetStaticProps } from "next"
import { FormEvent, Fragment, useCallback, useState } from "react"
import _ from "underscore"
import { Item } from "../../interfaces"
import { getLargeCategory } from "../../lib/get-large-category"
import { useLocalStorage } from "../../lib/use-local-storage"
import Head from '../../components/head'
import { useRouter } from "next/router"
import Link from 'next/link'
import { getItems } from "../../lib/get-items"
import { getSolverId } from "../../lib/get-solver-id"



export const getStaticProps: GetStaticProps = async () => {
    const items = await getItems()
    return {props: {items}, revalidate: 3600}
}

const Result = ({
    items
}: {
    items: (Item & {category: string})[]
}) => {
    const router = useRouter()
    const filtered = Object.fromEntries(Object.entries(router.query).filter(([k, v]) => (typeof(v) == 'string'))) as {[key: string]: string}
    const amounts = Object.fromEntries(Object.entries(filtered).map(([k, v]) => ([k, parseInt(v)])))
    const filteredItems = items.filter(item => item.id.toString() in amounts)
    const [possession, setPosession] = useLocalStorage('posession', Object.fromEntries(filteredItems.map((item) => [item.id, 0])))
    const [hideSufficient, setHideSufficient] = useState(false)
    const categories = ['スキル石', '強化素材', 'モニュピ']
    const initialTargetCategories = Object.fromEntries(categories.map(category => [category, category == '強化素材']))
    const [targetCategories, setTargetCategories] = useState(initialTargetCategories)
    const handleChangeTargetCategories = (e: FormEvent<HTMLInputElement>) => {
        const {name, checked} = e.currentTarget
        setTargetCategories(state => ({...state, [name]: checked}))
    }
    const showPositive = (value: number) => (value > 0 ? value : '')
    const onChangeSufficient = (event: FormEvent<HTMLInputElement>) => {
        setHideSufficient(event.currentTarget.checked)
    }
    const onChange = useCallback((event: FormEvent<HTMLInputElement>) => {
        const {name, valueAsNumber} = event.currentTarget
        setPosession(state => ({...state, [name]: valueAsNumber || 0}))
    }, [])
    const onFocus = useCallback((event: FormEvent<HTMLInputElement>) => {
        event.currentTarget.select()
    }, [])
    const deficiencies = Object.fromEntries(filteredItems.map((item) => ([item.id, amounts[item.id.toString()] - possession[item.id]])))
    const goSolver = useCallback((event) => {
        event.preventDefault()
        const queryItems = filteredItems
            .filter((item) => (deficiencies[item.id] > 0 && getSolverId(item) && targetCategories[getLargeCategory(item.category)]))
            .map((item) => (getSolverId(item) + ':' + deficiencies[item.id]))
            .join(',')
        router.push({
            pathname: '/farming',
            query: {items: queryItems}
        })
    }, [filteredItems, deficiencies, targetCategories])
    const itemGroup = Object.entries(_.groupBy(Object.entries(_.groupBy(filteredItems, item => item.category)), ([category, _items]) => getLargeCategory(category)))

    return (<>
        <Head title="アイテム必要数"/>
        <h1>アイテム必要数</h1>
        <form onSubmit={goSolver}>
            <input type="checkbox" id="hide-sufficient" checked={hideSufficient} onChange={onChangeSufficient}/>
            <label htmlFor="hide-sufficient">不足している素材のみ表示</label>
            {itemGroup.length == 0
            ? <p>表示するアイテムがありません。</p>
            : itemGroup.map(([largeCategory, subItemGroup]) => (
                <details key={largeCategory} open={largeCategory=="強化素材"}>
                    <summary>{largeCategory}</summary>
                    <table>
                        <thead>
                            <tr>
                                <th>アイテム</th>
                                <th>必要数</th>
                                <th>所持数</th>
                                <th>不足数</th>
                            </tr>
                        </thead>
                        <tbody>
                        {subItemGroup.map(([category, subItems]) => (
                            <Fragment key={category}>
                            <tr>
                                <th className="left" colSpan={4}>{category}</th>
                            </tr>
                            {subItems.filter((item) => (!hideSufficient || deficiencies[item.id] > 0)).map((item) => 
                                <tr key={item.id}>
                                    <td className="left">{item.name}</td>
                                    <td className="right">{amounts[item.id.toString()]}</td>
                                    <td className="right"><input type="number" className="posession right" name={item.id.toString()} value={possession[item.id]} min={0} onChange={onChange} onFocus={onFocus}/></td>
                                    <td className="right">{showPositive(deficiencies[item.id])}</td>
                                </tr>)}
                            </Fragment>
                        ))}
                        </tbody>
                    </table>
                </details>
            ))}
            <fieldset>
                <legend>周回数を求める対象</legend>
                {categories.map((category) => (
                    <div key={category}>
                        <input type="checkbox" id={category} name={category} checked={targetCategories[category]} onChange={handleChangeTargetCategories}/>
                        <label className="label" htmlFor={category}>{category}</label>
                    </div>
                ))}
            </fieldset>
            <button type="submit">クエスト周回数を求める</button>
            <p><Link href="/material"><a>サーヴァント選択に戻る</a></Link></p>
        </form>
        <style jsx>{`
            form {
                margin: 0;
                padding: 0;
                border: none;
                border-radius: 0;
                box-shadow: none;
                min-width: unset;
                max-width: unset;
            }
            table{
                display: block;
                white-space: normal;
            }
            legend {
                max-width: 30rem;
            }
            .left {
                text-align: left;
            }
            .right {
                text-align: right;
            }
            .posession {
                margin: 0;
                width: 5rem;
            }
        `}</style>
    </>)
}
export default Result