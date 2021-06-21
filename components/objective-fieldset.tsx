import { Fragment } from "react"

export default function ObjectiveFieldset({
    inputValues,
    handleChange
}:
{
    inputValues: {[key: string]: string},
    handleChange: React.FormEventHandler
}
) {
    return (
        <fieldset>
            <legend>最小化</legend>
            {[['ap', '消費AP'], ['lap', '周回数']].map(([ objective, description]) => (
                <Fragment key={objective}>
                    <input
                        type="radio"
                        name="objective"
                        value={objective}
                        onChange={handleChange}
                        checked={objective==inputValues.objective}
                        id={objective}
                    />
                    <label htmlFor={objective}>
                        {description}
                    </label>
                </Fragment>
            ))}
        </fieldset>
    )
}