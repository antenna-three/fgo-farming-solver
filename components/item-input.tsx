import React from "react"

export default function ItemInput({
    item,
    inputValues,
    handleChange
}: {
    item: {name: string, id: string},
    inputValues: {[key: string]: string},
    handleChange: React.FormEventHandler
}) {
    inputValues[item.id] ||= ''
    const id = 'item-' + item.id
    return (
        <div className="item-input">
            <label htmlFor={id} key={id}>
                {item.name}
            </label>
            <input
                type="number"
                inputMode="numeric"
                name={item.id}
                id={id}
                value={inputValues[item.id]}
                min={0}
                step={1}
                onChange={handleChange}
            />
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
                input:invalid {
                    background: #fee;
                    border-color: #f33;
                }
            `}</style>
        </div>
    )
} 