import { GetStaticProps } from "next"
import { useState } from "react"

const origin = 'https://api.atlasacademy.io'
const region = 'JP'

export const getStaticProps: GetStaticProps = async () => {
    const amounts = {
        6001: 948,
        6002: 855,
        6003: 738,
        6004: 915,
        6005: 669,
        6006: 789,
        6007: 663,
        6101: 948,
        6102: 855,
        6103: 738,
        6104: 915,
        6105: 669,
        6106: 789,
        6107: 663,
        6201: 948,
        6202: 855,
        6203: 738,
        6204: 915,
        6205: 669,
        6206: 789,
        6207: 663,
        6501: 1079,
        6502: 759,
        6503: 2391,
        6505: 1715,
        6506: 537,
        6507: 521,
        6508: 838,
        6509: 764,
        6510: 608,
        6511: 537,
        6512: 2004,
        6513: 532,
        6514: 326,
        6515: 940,
        6516: 2258,
        6517: 646,
        6518: 311,
        6519: 193,
        6520: 363,
        6521: 294,
        6522: 1184,
        6523: 375,
        6524: 939,
        6525: 295,
        6526: 1062,
        6527: 973,
        6528: 345,
        6529: 289,
        6530: 1324,
        6531: 219,
        6532: 337,
        6533: 986,
        6534: 206,
        6535: 240,
        6536: 552,
        6537: 426,
        6538: 372,
        6539: 464,
        6540: 285,
        6541: 274,
        6542: 69,
        6543: 336,
        6544: 180,
        6545: 216,
        6546: 185,
        6547: 144,
        6548: 102,
        6549: 216,
        6999: 324,
        7001: 302,
        7002: 271,
        7003: 241,
        7004: 254,
        7005: 209,
        7006: 249,
        7007: 193,
        7101: 302,
        7102: 271,
        7103: 246,
        7104: 249,
        7105: 209,
        7106: 249,
        7107: 193
    }
    const items = await Promise.all(Object.entries(amounts).map(([id, amount]) => {
        const url = `${origin}/nice/${region}/item/${id}`
        return fetch(url).then(res => res.json()).then(item => ({...item, amount}))
    }))
    return {props: {items}}
}

const Result = ({
    items
}: {
    items: any[]
}) => {
    const [possession, setPosession] = useState(Object.fromEntries(items.map(item => [item.id, 0])))
    const showPositive = (value: number) => (value > 0 ? value : '')
    return (<>
        {items.map((item) => (<div className="flex">
            <p key={item.id}>{item.name}: {item.amount}</p>
            <input type="number" value={possession[item.id]} onChange={(e) => {
                const value = e.currentTarget.value
                setPosession((prevState: {[key: string]: number}) => ({...prevState, [item.id]: value}))
            }}/>
            <p>{showPositive(item.amount - possession[item.id])}</p>
        </div>))}
        <style jsx>{`
            .flex {
                display: flex;
                flex-wrap: wrap;
            }
        `}</style>
    </>)
}

export default Result