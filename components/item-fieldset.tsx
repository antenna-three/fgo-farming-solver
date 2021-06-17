import { useState } from 'react'
import ItemInput from './item-input'

export default function ItemFieldSet(
        { category, items, handleChange }: {category: string, items: string[], handleChange: React.FormEventHandler }
) {
    
    
    return (
        <fieldset>
            <legend>
                    {category}
            </legend>
            <div className="item-input">
                {items.map(( item ) => (
                    <ItemInput key={item} itemName={item} handleChange={handleChange}/>
                ))}
            </div>
            <style jsx>{`
                .item-input {
                    display: flex;
                    flex-direction: column;
                }
            `}</style>
        </fieldset>
    )
}