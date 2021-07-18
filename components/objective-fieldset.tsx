import { Fragment } from "react"

export default function ObjectiveFieldset({
    objective,
    handleChange
}:
{
    objective: string,
    handleChange: React.FormEventHandler
}
) {
    return (
        <fieldset>
            <legend>最小化</legend>
            {[['ap', '消費AP'], ['lap', '周回数']].map(
                ([value, description]) => (
                    <Fragment key={value}>
                        <input
                            type="radio"
                            name="objective"
                            value={value}
                            onChange={handleChange}
                            checked={value==objective}
                            id={value}
                        />
                        <label htmlFor={value}>
                            {description}
                        </label>
                    </Fragment>
                )
            )}
        </fieldset>
    )
}