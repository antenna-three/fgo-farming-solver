import { TargetKey } from './../interfaces/atlas-academy'
import { entries, fromEntries } from './typed-entries'
export const createServantState = () => {
  const levels: { [key in TargetKey]: [number, number] } = {
    ascension: [0, 4],
    skill: [1, 10],
    appendSkill: [1, 10],
  }
  const arrays: { [key in TargetKey]: number[] } = {
    ascension: [1],
    skill: [1, 2, 3],
    appendSkill: [1, 2, 3],
  }
  const state = {
    disabled: true,
    targets: fromEntries(
      entries(levels).map(([target, [min, max]]) => [
        target,
        {
          disabled: false,
          ranges: arrays[target].map((i) => ({ start: min, end: max })),
        },
      ])
    ),
  }
  return state
}

export const createReinforcementState = (ids: string[]) => {
  const state = fromEntries(ids.map((id) => [id, createServantState()]))
  return state
}
