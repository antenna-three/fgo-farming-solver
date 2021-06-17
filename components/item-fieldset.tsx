import ItemInput from './item-input'

export default function ItemFieldSet(
        { category, items, handleChange }: {category: string, items: string[], handleChange: React.FormEventHandler }
    ) {
    
    return (
        <fieldset>
            <legend>{category}</legend>
            {items.map(( item ) => (
                <ItemInput key={item} itemName={item} handleChange={handleChange}/>
            ))}
        </fieldset>
    )
}