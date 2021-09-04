import { NextApiRequest, NextApiResponse } from "next";
import { Materials } from "../../../interfaces";
import fs from 'fs'
import path from 'path'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const origin = 'https://api.atlasacademy.io'
    const region = 'JP'
    const { id } = req.query
    if (typeof(id) !== 'string') {
        res.status(400)
        return
    }
    const dir = path.resolve('./public', 'materials')
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    const file = `${dir}/${id}.json`
    let materials
    try {
        const data = fs.readFileSync(file, 'utf-8')
        materials = JSON.parse(data)
    } catch (e) {
        const url = `${origin}/nice/${region}/servant/${id}`
        materials = await fetch(url)
            .then(r => r.json())
            .then((servant: {[key: string]: Materials}) => Object.fromEntries(
                Object.entries(servant)
                    .filter(([key, value]) => (key.endsWith('Materials')))
                    .map(([key, value]) => ([key, Object.fromEntries(
                        Object.entries(value).map(([level, {items, qp}]) => ([
                            level,
                            {
                                items: items.map(({item, amount}) => (
                                    {item: {id: item.id}, amount}
                                )),
                                qp
                            }
                        ]))
                    )]))
            ))
        const data = JSON.stringify(materials)
        fs.writeFile(file, data, (err) => {if (err) console.log(err)})
    }
    res.setHeader('Cache-control', 's-maxage=31536000')
    res.status(200).json(materials)
}