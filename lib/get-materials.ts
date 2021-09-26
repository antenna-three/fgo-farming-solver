import { origin, region } from "../constants/atlasacademy"
import { Materials, Servant } from "../interfaces"
import fs from "fs"
import path from "path"

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

export const getNiceServants: () => Promise<Servant[]> = async () => {
    if (process.env.NODE_ENV == 'development') {
        const servants = JSON.parse(fs.readFileSync(path.resolve('./dev/nice_servant.json'), 'utf-8'))
        return servants
    } else {
        let servants: {[key: string]: Materials}[] = []
        const cache = path.resolve('./nice_servant.json')
        try {
            servants = JSON.parse(fs.readFileSync(cache, 'utf-8'))
        } catch {
            const url = `${origin}/export/${region}/nice_servant.json`
            servants = await fetch(url).then(res => res.json())
            fs.writeFile(cache, JSON.stringify(servants), (err) => {console.log(err)})
        }
        return servants
    }
}

export const getServantMaterials = async () => {
    const servants = await getNiceServants()
    return Object.fromEntries(servants.map(servant => [servant.id, reduceServant(servant)]))
}