import { useState } from "react"
import { range } from "underscore"
import { State } from "./servant-level-select"

const origin = 'https://api.atlasacademy.io'
const region = 'JP'

const defaultDict = () => (
    new Proxy({} as {[key: string]: number}, {
        get: (target, name) => name in target && typeof(name) == 'string' ? target[name] : 0
    })
)

const calc = async (state: State) => {
    const sum = defaultDict()
    Object.entries(state)
        .filter(([id, {disabled}]) => (!disabled && id !== 'all'))
        .forEach(async ([id, {targets}]) => {
            const url = `${origin}/nice/${region}/servant/${id}`
            const servant = await fetch(url).then(res => res.json())
            Object.entries(targets)
                .filter(([_target, {disabled}]) => !disabled)
                .forEach(([target, {ranges}]) => {
                    const materials = servant[target + 'Materials']
                    ranges.forEach(({start, end}) => (
                        range(start, end).forEach(i => {
                            const {items, qp} = materials[i]
                            items.forEach(({item, amount}: {item: {id: number, name: string}, amount: number}) => {
                                sum[item.name] += amount
                            })
                            sum.qp += qp
                        })
                    ))
                })
        })
    return sum
}


const CalcButton = ({
    state
}: {
    state: State
}) => {
    const test = async () => {
        const res = await calc(state)
        console.log(res)
    }
    return (
        <button onClick={test}>Calc</button>
    )
}

export default CalcButton