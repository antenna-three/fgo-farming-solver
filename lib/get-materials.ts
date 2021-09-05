import { origin, region } from "../constants/atlasacademy"
import { Materials } from "../interfaces"

const reduceServant = (servant: { [key: string]: Materials }) => Object.fromEntries(
    Object.entries(servant)
        .filter(([key, value]) => (key.endsWith('Materials')))
        .map(([key, value]) => ([key, Object.fromEntries(
            Object.entries(value).map(([level, { items, qp }]) => ([
                level,
                {
                    items: items.map(({ item, amount }) => (
                        { item: { id: item.id }, amount }
                    )),
                    qp
                }
            ]))
        )]))
)

export const getServantMaterials = async () => {
    if (process.env.NODE_ENV == 'development') {
        const fs = require('fs')
        const path = require('path')
        const servants: {[key: string]: Materials}[] = JSON.parse(fs.readFileSync(path.resolve('./dev/nice_servant.json'), 'utf-8'))
        return Object.fromEntries(servants.map(servant => [servant.id, reduceServant(servant)]))
    } else {
        const url = `${origin}/export/${region}/nice_servant.json`
        const servants: {[key: string]: Materials}[] = await fetch(url).then(res => res.json())
        return Object.fromEntries(servants.map(servant => [servant.id, reduceServant(servant)]))
    }
}