export default function ItemInput({ item, inputValues, handleChange }: { item: {item: string, id: string}, inputValues: {[key: string]: string}, handleChange: React.FormEventHandler }) {
    return (
        <div className="item-input">
            <label htmlFor={ item.id } key={item.id}>
                {item.item}
            </label>
            <input type="number" name={item.id} id={item.id} value={inputValues[item.id]} onChange={handleChange}/>
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