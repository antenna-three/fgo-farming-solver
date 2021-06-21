export default function ItemInput({ itemName, handleChange }: { itemName: string, handleChange: React.FormEventHandler }) {
    return (
        <div className="item-input">
            <label htmlFor={ itemName }>
                {itemName}
            </label>
            <input type="number" name={itemName} id={itemName} onChange={handleChange}/>
            <style jsx>{`
                .item-input {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    width: fit-content;
                }
                label {
                    text-align: right;
                    margin-right: 1rem;
                    margin-bottom: 16px;
                }
                input {
                    width: 5rem;
                    margin-right: 1rem;
                }
            `}</style>
        </div>
    )
} 