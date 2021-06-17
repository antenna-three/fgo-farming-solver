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
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsWaiting(true)
        router.push({
            pathname: '/result',
            query: inputValues
        })
    }

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        let currentInputValues = {...inputValues}
        currentInputValues[event.currentTarget.name] = event.currentTarget.value
        setInputValues(currentInputValues)
    }

    const handleObjectiveChange = (event: React.FormEvent<HTMLInputElement>) => {
        let currentInputValues = {...inputValues}
        currentInputValues.objective = event.currentTarget.value
        setInputValues(currentInputValues)
    }

    const itemGroups = _.groupBy(itemList, item => item.category)
    const categoryGroups = _.groupBy(
        Object.entries(itemGroups),
        ([category, _]) => {
            if (category.endsWith('素材')) {
                return '強化素材'
            } else if (category.endsWith('石')) {
                return 'スキル強化素材'
            } else {
                return '再臨素材'
            }
        }
    )
    return (<>
        <form onSubmit={handleSubmit}>
            <input type="checkbox" onChange={(e) => setIsWaiting(e.currentTarget.checked)}/>
            <ObjectiveFieldset inputValues={inputValues} handleObjectiveChange={handleObjectiveChange} />
            <div className="category-fieldsets">
                {Object.entries(categoryGroups).map(( [largeCategory, categoryGroup] ) => (
                    <details>
                        <summary>{largeCategory}</summary>
                        <div className="item-fieldsets">
                            {categoryGroup.map(([category, items]) => (
                                <ItemFieldSet key={category} category={category} items={items.map(item => item.item)} handleChange={handleChange}/>
                            ))}
                        </div>
                    </details>
                ))}
            </div>
            <button type="submit">Solve</button>
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