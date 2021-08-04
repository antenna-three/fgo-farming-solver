import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import ItemFieldset from './item-fieldset'
import _ from 'underscore'
import { useRouter } from 'next/router'
import Overlay from './overlay'
import WarningConfirm from './warning-confirm'
import ObjectiveFieldset from './objective-fieldset'
import QuestTree from './quest-tree'
import ErrorBoundary from './error-boundary'
import { getLargeCategory } from '../lib/get-large-category'
import { createTree } from '../lib/create-tree'

function inputToQuery({
    objective,
    items,
    quests,
    halfDailyAp
}: {
    objective: string,
    items: {[key: string]: string},
    quests: string[],
    halfDailyAp: boolean
}) {
    return {
        objective,
        items: Object.entries(items)
            .filter(([item, count]) => (count != ''))
            .map(([item, count]) => (item + ':' + count))
            .join(','),
        quests: quests
            .reduce((acc, cur) => (acc.includes(cur[0]) || acc.includes(cur.slice(0, 2)) ? acc : [...acc, cur]), [] as string[])
            .join(','),
        ap_coefficients: halfDailyAp ? '0:0.5' : ''
    }
}

function queryToInput(
    initialInputState: {
        objective: string,
        items: {[key: string]: string},
        quests: string[],
        halfDailyAp: boolean
    },
    {objective, items, quests, halfDailyAp}: {objective: string, items: string, quests: string, halfDailyAp: string}
) {
    const queryQuests = quests.split(',')
    return {
        ...initialInputState,
        objective,
        items: Object.fromEntries(items.split(',').map((itemCount) => itemCount.split(':'))),
        quests: initialInputState.quests.filter((quest) => (
            queryQuests.includes(quest[0]) || queryQuests.includes(quest.slice(0, 2)) || queryQuests.includes(quest)
        )),
        halfDailyAp: (halfDailyAp === 'true')
    }
}

function isInputState(arg: any): arg is {objective: string, items: string, quests: string, halfDailyAp: string} {
    return typeof(arg.objective) == 'string' && typeof(arg.items) == 'string' && typeof(arg.quests) == 'string' && typeof(arg.halfDailyAp) == 'string'
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
        quests: ids,
        halfDailyAp: false
    }
    const [inputState, setInputState] = useState(initialInputState)
    const router = useRouter()
    const [isConfirming, setIsConfirming] = useState(false)

    useEffect(() => {
        if (isInputState(router.query)) {
            setInputState(queryToInput(initialInputState, router.query))
            router.replace('/', undefined, {'scroll': false, shallow: true})
        } else {
            const input = localStorage.getItem('input')
            if (input) {
                setInputState({...initialInputState, ...JSON.parse(input)})
            }
        }
    }, [])
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const query = inputToQuery(inputState)
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
                        setInputState((state) => {
                            const newState = {...state, objective: target.value}
                            localStorage.setItem('input', JSON.stringify(newState))
                            return newState
                        })
                    }}
                />
                <ItemFieldset
                    categoryGroups={categoryGroups}
                    inputItems={inputState.items}
                    handleChange={handleItemChange}
                />
                <ErrorBoundary>
                    <QuestTree tree={tree} checked={inputState.quests} setChecked={(quests) => {
                        setInputState((state) => {
                            const newState = {...state, quests}
                            localStorage.setItem('input', JSON.stringify(newState))
                            return newState
                        })
                    }}/>
                </ErrorBoundary>
                <fieldset>
                    <legend>キャンペーン</legend>
                    <input
                        type="checkbox"
                        value="half-daily-ap"
                        id="half-daily-ap"
                        checked={inputState.halfDailyAp}
                        onChange={() => {setInputState((state) => {
                            const newState = {...state, halfDailyAp: !state.halfDailyAp}
                            localStorage.setItem('input', JSON.stringify(newState))
                            return newState
                        })}}
                    />
                    <label htmlFor="half-daily-ap">
                        修練場AP半減
                    </label>
                </fieldset>
                {Object.values(inputState.items).every(s => !s) && <p className="error">集めたいアイテムの数を最低1つ入力してください。</p>}
                {inputState.quests.length == 0 && <p className="error">周回対象に含めるクエストを選択してください。</p>}
                <button
                    type="submit"
                    disabled={Object.values(inputState.items).every(s => !s) || inputState.quests.length == 0}
                >
                    計算
                </button>
                <button className="secondary" onClick={(e) => {
                    e.preventDefault()
                    setIsConfirming(true)
                }}>
                    リセット
                </button>
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
                    .error {
                        color: #f33;
                    }
                `}</style>
            </form>
            {isConfirming && (
                <Overlay>
                    <WarningConfirm
                        title="本当にリセットしますか？"
                        message="あらかじめ「入力内容のエクスポート」を使っておけば、後から入力内容を復元することができます。"
                        proceed="リセット"
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