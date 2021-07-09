import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import ItemFieldset from './item-fieldset'
import _ from 'underscore'
import { useRouter } from 'next/router'
import Spinner from './spinner'
import Overlay from './overlay'
import WarningConfirm from './warning-confirm'
import ObjectiveFieldset from './objective-fieldset'
import { getLargeCategory } from '../lib/get-large-category'
import QuestTree from './quest-tree'
import { createTree } from '../lib/create-tree'

function inputToQuery({objective, items, quests}: {objective: string, items: {[key: string]: string}, quests: string[]}) {
    return {
        objective,
        items: Object.entries(items)
            .filter(([item, count]) => (count != ''))
            .map(([item, count]) => (item + ':' + count))
            .join(','),
        quests: quests
            .reduce((acc, cur) => (acc.includes(cur[0]) || acc.includes(cur.slice(0, 2)) ? acc : [...acc, cur]), [] as string[])
            .join(',')
    }
}

function queryToInput(
    initialInputState: {objective: string, items: {[key: string]: string}, quests: string[]},
    {objective, items, quests}: {objective: string, items: string, quests: string}
) {
    const queryQuests = quests.split(',')
    return {
        ...initialInputState,
        objective,
        items: Object.fromEntries(items.split(',').map((itemCount) => itemCount.split(':'))),
        quests: initialInputState.quests.filter((quest) => (
            queryQuests.includes(quest[0]) || queryQuests.includes(quest.slice(0, 2)) || queryQuests.includes(quest)
        ))
    }
}

function isInputState(arg: any): arg is {objective: string, items: string, quests: string} {
    return typeof(arg.objective) == 'string' && typeof(arg.items) == 'string' && typeof(arg.quests) == 'string'
}

export default function ItemForm({
    items,
    quests
}: {
    items: {category: string, name: string, id: string}[],
    quests: {section: string, area: string, name: string, id: string}[]
}) {
    const {ids, tree} = createTree(quests)
    const initialInputState = {
        objective: 'ap',
        items: Object.fromEntries(items.map(item => [item.id, ''])),
        quests: ids
    }
    const [inputState, setInputState] = useState(initialInputState)
    const router = useRouter()
    const [isWaiting, setIsWaiting] = useState(false)
    const [isConfirming, setIsConfirming] = useState(false)

    useEffect(() => {
        if (isInputState(router.query)) {
            setInputState(queryToInput(initialInputState, router.query))
            router.replace('/', undefined, {'scroll': false, shallow: true})
        } else {
            const input = localStorage.getItem('input')
            if (input) {
                setInputState(JSON.parse(input))
            }
        }
    }, [])
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsWaiting(true)
        const query = inputToQuery(inputState)
        console.log(query)
        router.push({
            pathname: '/query',
            query
        })
    }

    const handleItemChange = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.currentTarget
        setInputState((state) => {
            const newState = {...state, items: {...state.items, [target.name]: target.value}}
            localStorage.setItem('input', JSON.stringify(newState))
            return newState
        })
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
                    objective={inputState.objective}
                    handleChange={(event: React.FormEvent<HTMLInputElement>) => {
                        const target = event.currentTarget
                        setInputState((state) => ({...state, objective: target.value}))
                    }}
                />
                <ItemFieldset
                    categoryGroups={categoryGroups}
                    inputItems={inputState.items}
                    handleChange={handleItemChange}
                />
                <QuestTree tree={tree} checked={inputState.quests} setChecked={(quests) => {
                    setInputState((state) => {
                        const newState = {...state, quests}
                        localStorage.setItem('input', JSON.stringify(newState))
                        return newState
                    })
                }}/>
                <button type="submit">計算</button>
                <button className="secondary" onClick={(e) => {
                    e.preventDefault()
                    setIsConfirming(true)
                }}>クリア</button>
                <Link href={{pathname: '/import-export', query: inputToQuery(inputState)}}>
                    <a>入力内容のエクスポート</a>
                </Link>
                <style jsx>{`
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
                            setInputState(initialInputState)
                            setIsConfirming(false)
                        }}
                        onCancel={() => setIsConfirming(false)}
                    />
                </Overlay>
            )}
        </>
    )
}