import { ObjectVersion } from "@aws-sdk/client-s3"
import { useState } from "react"
import _, { object } from "underscore"
import { range } from "underscore"
import { Materials, Servant } from "../interfaces"
import { State } from "./servant-level-select"

const origin = 'https://api.atlasacademy.io'
const region = 'JP'

const defaultDict = (defaultValue: any) => (
    new Proxy(object, {
        get: (target: any, name) => name in target ? target[name] : defaultValue
    })
)


const calc = async (state: State) => {
    const sum = defaultDict(0)
    const filtered = Object.entries(state).filter(([id, {disabled}]) => (!disabled && id !== 'all'))
    const urls = filtered.map(([id, _t]) => (`${origin}/nice/${region}/servant/${id}`))
    const servants: Servant[] = await Promise.all(urls.map(url => fetch(url).then(res => res.json()).catch(err => console.log(err))))
    const servantsTargets = filtered.map(([_id, {targets}]) => targets)
    for (let i = 0; i < servants.length; i++) {
        const servant = servants[i]
        const targets = servantsTargets[i]
        Object.entries(targets)
            .filter(([_target, {disabled}]) => !disabled)
            .forEach(([target, {ranges}]) => {
                const materials: Materials = servant[target + 'Materials' as keyof Servant]
                ranges.forEach(({start, end}) => (
                    range(start, end).forEach(i => {
                        const {items, qp} = materials[i]
                        items.forEach(({item, amount}: {item: {id: number, name: string}, amount: number}) => {
                            sum[item.id] += amount
                        })
                        sum.qp += qp
                    })
                ))
            })
    }
    return sum
}


const CalcButton = ({
    state
}: {
    state: State
}) => {
    const test = async () => {
        console.log('calculating...')
        const res = await calc(state)
        const sorted = Object.fromEntries(Object.entries(res).sort(([id1, amount1], [id2, amount2]) => parseInt(id1) - parseInt(id2)))
        console.log(res)
    }
    return (
        <button onClick={test}>Calc</button>
    )
}

export default CalcButton