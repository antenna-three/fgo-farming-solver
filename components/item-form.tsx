import React, {useEffect, useState} from 'react'
import ItemFieldSet from './item-fieldset'
import _ from 'underscore'
import { useRouter } from 'next/router'
import SpinnerOverlay from './spinner-overlay'
import ObjectiveFieldset from './objective-fieldset'

export default function ItemForm({ itemList }: { itemList: {category: string, item: string}[] }) {
    const initialInputValues = Object.fromEntries(itemList.map(item => [item.item, '']))
    initialInputValues.objective = 'ap'
    const [inputValues, setInputValues] = useState(initialInputValues)
    const router = useRouter()
    const [isWaiting, setIsWaiting] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const savedInputValues = localStorage.getItem('inputValues')
        if (savedInputValues) {
            setInputValues(JSON.parse(savedInputValues))
        }
    }, [])
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsWaiting(true)
        router.push({
            pathname: '/res',
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
        ([category, _]) => {
            if (category.endsWith('素材')) {
                return '強化素材'
            } else if (category.endsWith('石')) {
                return 'スキル石'
            } else {
                return 'モニュピ'
            }
        }
    )
    return (<>
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
                                    items={items.map(item => item.item)}
                                    inputValues={inputValues}
                                    handleChange={handleChange}
                                />
                            ))}
                        </div>
                    </details>
                ))}
            </div>
            <button type="submit">計算</button>
            <style jsx>{`
                .item-fieldsets {
                    display: flex;
                    flex-wrap: wrap;
                }
            `}</style>
        </form>
        {isWaiting && <SpinnerOverlay/>}</>
    )
}