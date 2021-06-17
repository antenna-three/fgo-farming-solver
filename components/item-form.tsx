import React, {useState} from 'react'
import ItemFieldSet from './item-fieldset'
import _ from 'underscore'
import { useRouter } from 'next/router'

export default function ItemForm({ itemList }: { itemList: {category: string, item: string}[] }) {
    const initialInputValues = Object.fromEntries(itemList.map(item => [item.item, '']))
    initialInputValues.objective = 'lap'
    const [inputValues, setInputValues] = useState(initialInputValues)
    const router = useRouter()
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('handleSubmit')
        console.log(inputValues)
        router.push({
            pathname: '/result',
            query: inputValues
        })
        /*
        let result: {
            quest_laps: {[key: string]: number},
            item_counts: {[key: string]: number}
        } | null
        try {
            result = await callApi(inputValues)
            if (result === null) {
                return
            }
        } catch (e) {
            console.log(e, e.stack)
            return
        }
        const quest_laps = result.quest_laps
        const item_counts = result.item_counts
        */
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