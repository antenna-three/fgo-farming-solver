export default function ItemInput({ item, inputValues, handleChange }: { item: {name: string, id: string}, inputValues: {[key: string]: string}, handleChange: React.FormEventHandler }) {
    inputValues[item.id] ||= ''
    const id = 'item-' + item.id
    return (
        <div className="item-input">
            <label htmlFor={id} key={id}>
                {item.name}
            </label>
            <input type="number" name={item.id} id={id} value={inputValues[item.id]} onChange={handleChange}/>
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