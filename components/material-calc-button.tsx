import { useRouter } from "next/router"
import { useState } from "react"
import _ from "underscore"
import { range } from "underscore"
import { Materials, Servant } from "../interfaces"
import { State } from "./servant-level-select"

const origin = 'https://api.atlasacademy.io'
const region = 'JP'

const defaultDict = (defaultValue: any) => (
    new Proxy({} as object, {
        get: (target: any, name) => name in target ? target[name] : defaultValue
    })
)


const calc = async (state: State) => {
    const sum = defaultDict(0)
    const filtered = Object.entries(state).filter(([id, {disabled}]) => (!disabled && id !== 'all'))
    const urls = filtered.map(([id, _t]) => (`/api/materials/${id}`))
    const servants: Servant[] = await Promise.all(urls.map(url => fetch(url).then(res => res.json()).catch(err => console.log(err))))
    const servantsTargets = filtered.map(([_id, {targets}]) => targets)
    servants.forEach((servant, index) => {
        const targets = servantsTargets[index]
        Object.entries(targets)
            .filter(([_target, {disabled}]) => !disabled)
            .forEach(([target, {ranges}]) => {
                const materials: Materials = servant[target + 'Materials' as keyof Servant]
                ranges.forEach(({start, end}) => (
                    range(start, end).forEach(i => {
                        if (materials[i] == null) {
                            return
                        }
                        const {items, qp} = materials[i]
                        items.forEach(({item, amount}: {item: {id: number, name: string}, amount: number}) => {
                            sum[item.id] += amount
                        })
                        sum[1] += qp
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
    const [calculating, setCalculating] = useState(false)
    const router = useRouter()
    const test = async () => {
        setCalculating(true)
        const query = await calc(state)
        router.push({
            pathname: '/material/result',
            query
        })
    }
    return (
        <button onClick={test}>
            {calculating ? <div className="loader"/> : <span className="text">計算</span>}
            <style jsx>{`
                .loader, .loader::after {
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                }
                .loader {
                    margin: 0;
                    font-size: 20px;
                    position: relative;
                    text-indent: -9999em;
                    border-top: 3px solid #fff4;
                    border-right: 3px solid #fff4;
                    border-bottom: 3px solid #fff4;
                    border-left: 3px solid #fff;
                    animation: load 1s infinite linear;
                }
                @keyframes load {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </button>
    )
}

export default CalcButton