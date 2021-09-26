import { origin, region } from "../constants/atlasacademy"
import { Materials, Servant } from "../interfaces"
import { promises as fs, createWriteStream } from "fs"
import path from "path"
import fetch from "node-fetch"

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
    const cacheDir = path.resolve('./cache')
    await fs.mkdir(cacheDir).catch(() => {})
    const cache = path.resolve(cacheDir, 'nice_servant.json')
    const servants = fs.readFile(cache, 'utf-8')
        .then(json => JSON.parse(json))
        .catch(async err => {
            const url = `${origin}/export/${region}/nice_servant.json`
            const res = await fetch(url)
            const cacheFile = createWriteStream(cache, 'utf-8')
            res.body.pipe(cacheFile)
            return res.json()
        })
    return servants
}

export const getServantMaterials = async () => {
    const servants = await getNiceServants()
    return Object.fromEntries(servants.map(servant => [servant.id, reduceServant(servant)]))
}