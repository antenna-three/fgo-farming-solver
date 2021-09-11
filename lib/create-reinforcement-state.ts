export const createServantState = () => {
    const levels = {
        ascension: [0, 4],
        skill: [1, 10],
        appendSkill: [1, 10],
    }
    const arrays: {[key: string]: number[]} = {
        ascension: [1],
        skill: [1, 2, 3],
        appendSkill: [1, 2, 3],
    }
    const state = {
        disabled: true,
        targets: Object.fromEntries(Object.entries(levels).map(([target, [min, max]]) => ([
            target,
            {
                disabled: false,
                ranges: arrays[target].map(i => (
                    {start: min, end: max}
                ))
            }
        ])))
    }
    return state
}

export const createReinforcementState = (ids: string[]) => {
    const state = Object.fromEntries(ids.map((id) => ([id, createServantState()])))
    return state
}