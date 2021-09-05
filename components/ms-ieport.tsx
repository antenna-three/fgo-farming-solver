import { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction } from "react"
import { range } from "underscore"
import { Servant } from "../interfaces"
import { createReinforcementState } from "../lib/create-reinforcement-state"
import { getMsIds } from "../lib/get-msids"
import { State } from "./servant-level-select"

const MsIeport = ({
    servants,
    state,
    setState,
}: {
    servants: Servant[],
    state: State
    setState: Dispatch<SetStateAction<State>>,
}) => {
    const {getId, getMsId} = getMsIds(servants)
    const initialState = createReinforcementState(['all', ...servants.map(({id}) => id.toString())])
    const msServants = Object.entries(state).filter(([id, {disabled}]) => !disabled)
        .map(([id, {targets}]) => (
            [
                getMsId(parseInt(id)),
                targets.ascension.ranges[0].start,
                targets.ascension.ranges[0].end,
                ...targets.skill.ranges.flatMap(({start, end}) => [start, end]),
                //...targets.appendSkill.ranges.flatMap(({start, end}) => [start, end]),
                1,
                0,
            ]
        ))
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = event.currentTarget
        const msServants_ = JSON.parse(value)
        setState(state => ({
            ...initialState,
            ...state,
            ...Object.fromEntries(msServants_.map((msServant: number[]) => {
                const id = getId(msServant[0]) || 0
                const ascentionRanges = {start: msServant[1], end: msServant[2]}
                const msSkill = msServant.slice(3, 9)
                const skillRanges = range(3).reduce((acc, i) => (
                    [...acc, {start: msSkill[i * 2], end: msSkill[i * 2 + 1]}]
                ), [] as {start: number, end: number}[])
                const newState = [
                    id,
                    {
                        disabled: false,
                        targets: {
                            ascension: {
                                disabled: ascentionRanges.start == ascentionRanges.end,
                                ranges: [
                                    {
                                        start: ascentionRanges.start,
                                        end: ascentionRanges.end,
                                    }
                                ]
                            },
                            skill: {
                                disabled: false,
                                ranges: skillRanges
                            },
                            appendSkill: id.toString() in state ? state[id.toString()].targets.appendSkill : range(3).map(() => ({start: 1, end: 10}))
                        }
                    }
                ]
                console.log(newState)
                return newState
            }))
        }))
    }
    return (
        <textarea value={JSON.stringify(msServants)} onChange={handleChange}/>
    )
    
}
export default MsIeport