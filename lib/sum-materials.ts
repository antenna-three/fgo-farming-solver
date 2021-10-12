import { MaterialsRecord } from './../interfaces/atlas-academy'
import { range } from 'underscore'
import { State } from '../components/material/servant-level-select'
import { Materials } from '../interfaces/atlas-academy'
import { entries } from './typed-entries'

export const sumMaterials = (
  state: State,
  servantMaterials: { [id: string]: MaterialsRecord }
) => {
  const sum = new Proxy(
    {},
    {
      get: (target: { [key: string]: number }, name: string) =>
        name in target ? target[name] : 0,
    }
  )
  const filtered = Object.entries(state).filter(
    ([id, { disabled }]) => !disabled && id !== 'all'
  )
  filtered.forEach(([id, { targets }]) => {
    const servant = servantMaterials[id]
    if (servant == null) {
      console.log(`Materials for Id ${id} is undefined`)
      return
    }
    entries(targets)
      .filter(([_target, { disabled }]) => !disabled)
      .forEach(([target, { ranges }]) => {
        const materials: Materials = servant[`${target}Materials`]
        if (materials == null) {
          console.log(`${target}Materials for Id ${id} is undefined`)
          return
        }
        ranges.forEach(({ start, end }) =>
          range(start, end).forEach((i) => {
            if (materials[i] == null) {
              return
            }
            const { items, qp } = materials[i]
            items.forEach(
              ({
                item,
                amount,
              }: {
                item: { id: number; name: string }
                amount: number
              }) => {
                sum[item.id] += amount
              }
            )
            sum[1] += qp
          })
        )
      })
  })
  return sum
}
