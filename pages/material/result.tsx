import { GetServerSideProps } from "next"
import { FormEvent, Fragment, useCallback, useState } from "react"
import _ from "underscore"
import { Item } from "../../interfaces"
import { getLargeCategory } from "../../lib/get-large-category"
import { useLocalStorage } from "../../lib/use-local-storage"
import Head from '../../components/head'
import { useRouter } from "next/router"
import Link from 'next/link'

const origin = 'https://api.atlasacademy.io'
const region = 'JP'

const areValuesString = (obj: any): obj is {[key: string]: string} => {
    return Object.values(obj).every(value => typeof(value) === 'string')
}


const getCategory = (item: Item) => {
    switch (Math.floor(item.priority / 100)) {
    case 0:
        return 'QP'
    case 1:
        switch (item.background) {
            case 'bronze':
                return '輝石'
            case 'silver':
                return '魔石'
            case 'gold':
                return '秘石'
        }
    case 2:
        switch (item.background) {
            case 'bronze':
                return '銅素材'
            case 'silver':
                return '銀素材'
            case 'gold':
                return '金素材'
        }
    case 3:
        switch (item.background) {
            case 'silver':
                return 'ピース'
            case 'gold':
                return 'モニュメント'
        }
    default:
        return '特殊霊基再臨素材'
    } 
}


const getSolverId = (item: Item) => {
    if (100 <= item.priority && item.priority < 107) {
        //輝石
        return '3' + (item.priority - 100).toString(36)
    } else if (107 <= item.priority && item.priority < 114) {
        //魔石
        return '4' + (item.priority - 107).toString(36)
    } else if (114 <= item.priority && item.priority < 121) {
        //秘石
        return '5' + (item.priority - 114).toString(36)
    } else if (200 <= item.priority && item.priority < 210) {
        //銅素材
        return '0' + (item.priority - 200).toString()
    } else if (210 <= item.priority && item.priority < 220) {
        //銀素材
        return '1' + (item.priority - 210).toString(36)
    } else if (220 <= item.priority && item.priority < 232) {
        return '1' + (item.priority - 211).toString(36)
    } else if (232 <= item.priority && item.priority < 299) {
        //金素材
        return '2' + (item.priority - 232).toString(36)
    } else if (300 <= item.priority && item.priority < 307) {
        //ピース
        return '6' + (item.priority - 300).toString(36)
    } else if (307 <= item.priority && item.priority < 314) {
        //モニュメント
        return '7' + (item.priority - 307).toString(36)
    }
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const {query} = context
    if (query == null || !areValuesString(query)) {
        return {props: {items: {}}}
    }
    let items = await Promise.all(Object.entries(query).map(([id, amount]) => {
        const url = `${origin}/nice/${region}/item/${id}`
        return fetch(url).then(res => res.json()).then(item => ({id, item, amount: parseInt(amount), category: getCategory(item)}))
    }))
    items.sort((a, b) => (a.item.priority - b.item.priority))
    console.log(items.filter(({item, amount}) => (item.id == null)))
    return {props: {items}}
}

const Result = ({
    items
}: {
    items: {item: Item, amount: number, category: string}[]
}) => {
    const [possession, setPosession] = useLocalStorage('posession', Object.fromEntries(items.map(({item}) => [item.id, 0])))
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
    const deficiencies = Object.fromEntries(items.map(({item, amount}) => ([item.id, amount - possession[item.id]])))
    const router = useRouter()
    const goSolver = useCallback((event) => {
        event.preventDefault()
        const queryItems = items
            .filter(({item, category}) => (deficiencies[item.id] > 0 && getSolverId(item) && targetCategories[getLargeCategory(category)]))
            .map(({item}) => (getSolverId(item) + ':' + deficiencies[item.id]))
            .join(',')
        router.push({
            pathname: '/farming',
            query: {items: queryItems}
        })
    }, [items, deficiencies, targetCategories])
    const itemGroup = Object.entries(_.groupBy(Object.entries(_.groupBy(items, item => item.category)), ([category, _items]) => getLargeCategory(category)))

    return (<>
        <Head title="アイテム必要数"/>
        <h1>アイテム必要数</h1>
        <form onSubmit={goSolver}>
            <input type="checkbox" id="hide-sufficient" checked={hideSufficient} onChange={onChangeSufficient}/>
            <label htmlFor="hide-sufficient">不足している素材のみ表示</label>
            {itemGroup.map(([largeCategory, subItemGroup]) => (
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
                            {subItems.filter(({item}) => (!hideSufficient || deficiencies[item.id] > 0)).map(({item, amount}) => 
                                <tr key={item.id}>
                                    <td className="left">{item.name}</td>
                                    <td className="right">{amount}</td>
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