import { useState } from 'react'
import ItemInput from './item-input'

export default function ItemFieldSet(
        { category, items, inputValues, handleChange }: {category: string, items: {item: string, id: string}[], inputValues: {[key: string]: string}, handleChange: React.FormEventHandler }
) {
    
    
    return (
        <fieldset>
            <legend>
                    {category}
            </legend>
            <div className="item-input">
                {items.map(( item ) => (
                    <ItemInput key={item.id} item={item} inputValues={inputValues} handleChange={handleChange}/>
                ))}
            </div>
            <style jsx>{`
                .item-input {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-end;
                    width: fit-content;
                    margin: auto;
                }
            `}</style>
        </fieldset>
    )
}