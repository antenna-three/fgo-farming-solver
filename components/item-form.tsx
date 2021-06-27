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

export default function ItemForm({
    itemList
}: {
    itemList: {category: string, item: string, id: string}[]
}) {
    const initialInputValues = Object.fromEntries(itemList.map(item => [item.id, '']))
    initialInputValues.objective = 'ap'
    const [inputValues, setInputValues] = useState(initialInputValues)
    const router = useRouter()
    const [isWaiting, setIsWaiting] = useState(false)
    const [isConfirming, setIsConfirming] = useState(false)

    useEffect(() => {
        if (Object.keys(router.query).length > 0) {
            setInputValues(router.query as any)
            router.replace('/', undefined, {'scroll': false, shallow: true})
            localStorage.setItem('inputValues', JSON.stringify(inputValues))
        } else {
            const savedInputValues = localStorage.getItem('inputValues')
            if (savedInputValues) {
                setInputValues(JSON.parse(savedInputValues))
            }
        }
    }, [])
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsWaiting(true)
        router.push({
            pathname: '/query',
            query: inputValues
        })
    }

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        let currentInputValues = {...inputValues}
        currentInputValues[event.currentTarget.name] = event.currentTarget.value
        setInputValues(currentInputValues)
        localStorage.setItem('inputValues', JSON.stringify(currentInputValues))
    }

    const itemGroups = _.groupBy(itemList, item => item.category)
    const categoryGroups = _.groupBy(
        Object.entries(itemGroups),
        ([category, _]) => getLargeCategory(category)
    )
    return (
        <>
            <form onSubmit={handleSubmit}>
                <ObjectiveFieldset
                    inputValues={inputValues}
                    handleChange={handleChange}
                />
                <div className="category-fieldsets">
                    {Object.entries(categoryGroups).map(( [largeCategory, categoryGroup] ) => (
                        <details key={largeCategory} open={largeCategory=='強化素材'}>
                            <summary>{largeCategory}</summary>
                            <div className="item-fieldsets">
                                {categoryGroup.map(([category, items]) => (
                                    <ItemFieldSet
                                        key={category}
                                        category={category}
                                        items={items}
                                        inputValues={inputValues}
                                        handleChange={handleChange}
                                    />
                                ))}
                            </div>
                        </details>
                    ))}
                </div>
                <button type="submit">計算</button>
                <button className="secondary" onClick={(e) => {
                    e.preventDefault()
                    setIsConfirming(true)
                }}>クリア</button>
                <Link href={{pathname: '/import-export', query: inputValues}}>
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
                            setInputValues(initialInputValues)
                            setIsConfirming(false)
                        }}
                        onCancel={() => setIsConfirming(false)}
                    />
                </Overlay>
            )}
        </>
    )
}