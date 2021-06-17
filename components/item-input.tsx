export default function ItemInput({ itemName, handleChange }: { itemName: string, handleChange: React.FormEventHandler }) {
    return (
        <div>
            <label>
                {itemName}
                <input type="number" name={itemName} onChange={handleChange}/>
            </label>
        </div>
    )
} 