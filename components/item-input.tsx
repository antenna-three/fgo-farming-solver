export default function ItemInput({ itemName, handleChange }: { itemName: string, handleChange: React.FormEventHandler }) {
    return (
        <div className="item-input">
            <label htmlFor={ itemName }>
                {itemName}
            </label>
            <input type="number" name={itemName} id={itemName} onChange={handleChange}/>
            <style jsx>{`
                div {
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: space-around;
                    align-items: center;
                }
                label {
                    text-align: right;
                }
                input {
                    flex-basis: 5rem;
                    width: 5rem;
                }
            `}</style>
        </div>
    )
} 