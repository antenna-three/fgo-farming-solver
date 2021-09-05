import { origin, region } from "../constants/atlasacademy"
import { Materials } from "../interfaces"

export const getServantMaterials = async (ids: string[]) => {
    const servantUrls = ids.map((id) => `${origin}/nice/${region}/servant/${id}`)
    const servants = await Promise.all(servantUrls.map(url => fetch(url)
        .then(res => res.json())
        .then((servant: { [key: string]: Materials }) => Object.fromEntries(
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
        ))
    ))
    const servantMaterials = Object.fromEntries(ids.map((id, index) => ([id, servants[index]])))
    return servantMaterials
}