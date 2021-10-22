import { MaterialsKey, MaterialsRecord } from '../interfaces/atlas-academy'
import { getNiceServants } from './get-nice-servants'
import { entries, fromEntries } from '../utils/typed-entries'

export type ReducedMaterials = {
  [key: string]: {
    items: {
      item: { id: number }
      amount: number
    }[]
    qp: number
  }
}
export type ReducedMaterialsRecord = Record<MaterialsKey, ReducedMaterials>
export type MaterialsForServants = {
  [servantId: string]: ReducedMaterialsRecord
}

const reduceServant = (servant: MaterialsRecord): ReducedMaterialsRecord =>
  fromEntries(
    entries(servant)
      .filter(([key]) => key.endsWith('Materials'))
      .map(([key, value]) => [
        key,
        fromEntries(
          entries(value).map(([level, { items, qp }]) => [
            level,
            {
              items: items.map(({ item, amount }) => ({
                item: { id: item.id },
                amount,
              })),
              qp,
            },
          ])
        ),
      ])
  )

export const getMaterialsForServants =
  async (): Promise<MaterialsForServants> => {
    const servants = await getNiceServants()
    return Object.fromEntries(
      servants.map((servant) => [servant.id, reduceServant(servant)])
    )
  }
