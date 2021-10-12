import { MaterialsRecord } from '../interfaces/atlas-academy'
import { getNiceServants } from './get-nice-servants'

const reduceServant = (servant: MaterialsRecord) =>
  Object.fromEntries(
    Object.entries(servant)
      .filter(([key, value]) => key.endsWith('Materials'))
      .map(([key, value]) => [
        key,
        Object.fromEntries(
          Object.entries(value).map(([level, { items, qp }]) => [
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

export const getMaterialsForServants = async () => {
  const servants = await getNiceServants()
  return Object.fromEntries(
    servants.map((servant) => [servant.id, reduceServant(servant)])
  )
}
