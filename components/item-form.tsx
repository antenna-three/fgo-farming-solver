import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import ItemFieldSet from './item-fieldset'
import _ from 'underscore'
import { useRouter } from 'next/router'
import Spinner from './spinner'
import Overlay from './overlay'
import WarningConfirm from './warning-confirm'
import ObjectiveFieldset from './objective-fieldset'
import { getLargeCategory } from '../lib/get-large-category'
import QuestTree from './quest-tree'
import { createTree } from '../lib/create-tree'
import { useSavedState, loadSavedState } from '../lib/use-saved-state'

function inputToQuery(inputObjective: string, inputItems: {[key: string]: string}, inputQuests: string[]) {
    const items = Object.entries(inputItems)
        .filter(([item, count]) => (count != ''))
        .map(([item, count]) => (item + ':' + count))
        .join(',')
    const quests = inputQuests
        .reduce((acc, cur) => (acc[acc.length - 1] == cur[0] + '0000' || acc[acc.length - 1] == cur.slice(0, 3) + '00' ? acc : [...acc, cur]), [] as string[])
        .join(',')
    return {
        objective: inputObjective,
        items,
        quests
    }
}

export default function ItemForm({
    items,
    quests
}: {
    items: {category: string, item: string, id: string}[],
    quests: {chapter: string, area: string, quest: string, id: string}[]
}) {
    const initialInputItems = Object.fromEntries(items.map(item => [item.id, '']))
    const initialInputObjective = 'ap'
    const {ids, tree} = createTree(quests)
    const initialInputQuests = ids
    const [inputObjective, setInputObjective] = useSavedState(initialInputObjective, 'inputObjective')
    const [inputItems, setInputItems] = useSavedState(initialInputItems, 'inputItems')
    const [inputQuests, setInputQuests] = useSavedState(initialInputQuests, 'inputQuests')
    const router = useRouter()
    const [isWaiting, setIsWaiting] = useState(false)
    const [isConfirming, setIsConfirming] = useState(false)

    useEffect(() => {
        if (typeof(router.query.objective) == 'string'
                && typeof(router.query.items) == 'string'
                && typeof(router.query.quests) == 'string') {
            const items: {[key: string]: any} = Object.fromEntries(router.query.items.split(',').map((itemCount: string) => itemCount.split(':')))
            const quests: string[] = router.query.quests.split(',')
            setInputObjective(router.query.objective)
            setInputItems(items)
            setInputQuests(quests)
            router.replace('/', undefined, {'scroll': false, shallow: true})
        } else {
            setInputObjective(JSON.parse(localStorage.getItem('inputObjective') || 'null') || initialInputObjective)
            setInputItems({...initialInputItems, ...JSON.parse(localStorage.getItem('inputItems') || 'null')})
            setInputQuests(JSON.parse(localStorage.getItem('inputQuests') || 'null') || initialInputQuests)
        }
    }, [])
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsWaiting(true)
        const query = inputToQuery(inputObjective, inputItems, inputQuests)
        router.push({
            pathname: '/query',
            query
        })
    }

    const handleItemChange = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.currentTarget
        const newInputItems = {...inputItems, [target.name]: target.value}
        setInputItems(newInputItems)
    }

    const itemGroups = Object.entries(_.groupBy(items, item => item.category))
    const categoryGroups = Object.entries(_.groupBy(
        itemGroups,
        ([category, _]) => getLargeCategory(category)
    ))
    return (
        <>
            <form onSubmit={handleSubmit}>
                <ObjectiveFieldset
                    objective={inputObjective}
                    handleChange={(event: React.FormEvent<HTMLInputElement>) => {
                        setInputObjective(event.currentTarget.value)
                    }}
                />
                <fieldset>
                    <legend>集めたいアイテムの数</legend>
                    {categoryGroups.map(( [largeCategory, categoryGroup] ) => (
                        <details key={largeCategory} open={largeCategory=='強化素材'}>
                            <summary>{largeCategory}</summary>
                            <div className="item-fieldsets">
                                {categoryGroup.map(([category, items]) => (
                                    <ItemFieldSet
                                        key={category}
                                        category={category}
                                        items={items}
                                        inputValues={inputItems}
                                        handleChange={handleItemChange}
                                    />
                                ))}
                            </div>
                        </details>
                    ))}
                </fieldset>
                <QuestTree tree={tree} checked={inputQuests} setChecked={setInputQuests}/>
                <button type="submit">計算</button>
                <button className="secondary" onClick={(e) => {
                    e.preventDefault()
                    setIsConfirming(true)
                }}>クリア</button>
                <Link href={{pathname: '/import-export', query: inputToQuery(inputObjective, inputItems, inputQuests)}}>
                    <a>入力内容のエクスポート</a>
                </Link>
                <style jsx>{`
                    .item-fieldsets {
                        display: flex;
                        flex-wrap: wrap;
                    }
                    button {
                        margin-right: 1rem;
                    }
                    .secondary {
                        background: #aaa;
                        border-color: #aaa;
                    }
                `}</style>
            </form>
            {isWaiting && (<Overlay><Spinner/></Overlay>)}
            {isConfirming && (
                <Overlay>
                    <WarningConfirm
                        title="本当に全消去しますか？"
                        message="予め「入力内容のエクスポート」を使っておけば、後から入力内容を復元することができます。"
                        proceed="全消去"
                        cancel="キャンセル"
                        onProceed={() => {
                            setInputObjective(initialInputObjective)
                            setInputItems(initialInputItems)
                            setInputQuests(initialInputQuests)
                            setIsConfirming(false)
                        }}
                        onCancel={() => setIsConfirming(false)}
                    />
                </Overlay>
            )}
        </>
    )
}