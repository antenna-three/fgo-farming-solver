import React, {useState} from 'react'
import ItemFieldSet from './item-fieldset'
import _ from 'underscore'
import {callApi} from '../lib/call-api'

export default function ItemForm({ itemList }: { itemList: {category: string, item: string}[] }) {
    const initialInputValues = Object.fromEntries(itemList.map(item => [item.item, '']))
    initialInputValues.objective = 'lap'
    const [inputValues, setInputValues] = useState(initialInputValues)
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('handleSubmit')
        console.log(inputValues)
        const result = await callApi(inputValues)
        if (result === null) {
            return
        }
        const quest_laps = result.quest_laps
        const item_counts = result.item_counsts
        
    }

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        let currentInputValues = {...inputValues}
        currentInputValues[event.currentTarget.name] = event.currentTarget.value
        setInputValues(currentInputValues)
    }

    const itemGroups = _.groupBy(itemList, item => item.category)
    return (
        <form onSubmit={handleSubmit}>
            {Object.entries(itemGroups).map(( [category, items] ) => (
                <ItemFieldSet key={category} category={category} items={items.map(item => item.item)} handleChange={handleChange}/>
            ))}
            <button type="submit">Solve</button>
        </form>
    )
}