export default function ObjectiveFieldset({
    inputValues,
    handleObjectiveChange
}:
{
    inputValues: {[key: string]: string},
    handleObjectiveChange: React.FormEventHandler
}
) {
    return (
        <fieldset>
            <legend>最小化</legend>
            {[['ap', '消費AP'], ['lap', '周回数']].map(([ objective, description]) => (
                <label key={objective}>
                    <input
                        type="radio"
                        name="objective"
                        value={objective}
                        onChange={handleObjectiveChange}
                        checked={objective==inputValues.objective}
                    />
                    {description}
                </label>
            ))}
        </fieldset>
    )
}