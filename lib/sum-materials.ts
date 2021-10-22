import { range } from '../utils/range'
import { entries } from '../utils/typed-entries'
import { ChaldeaState } from '../hooks/create-chaldea-state'
import { MaterialsForServants } from './get-materials'

export const sumMaterials = (
  state: ChaldeaState,
  servantMaterials: MaterialsForServants
) => {
  const sum = new Proxy<{ [itemId: string | symbol]: number }>(
    {},
    {
      get: (target, name) => (name in target ? target[name] : 0),
    }
  )
  Object.entries(state)
    .filter(([id, { disabled }]) => !disabled && id in servantMaterials)
    .forEach(([id, { targets }]) => {
      const servant = servantMaterials[id]
      entries(targets)
        .filter(
          ([target, { disabled }]) =>
            !disabled && `${target}Materials` in servant
        )
        .forEach(([target, { ranges }]) => {
          const materials = servant[`${target}Materials`]
          ranges.forEach(({ start, end }) =>
            range(start, end)
              .filter((i) => i in materials)
              .forEach((i) => {
                const { items, qp } = materials[i]
                items.forEach(({ item, amount }) => {
                  sum[item.id] += amount
                })
                sum[1] += qp
              })
          )
        })
    })
  return sum
}
