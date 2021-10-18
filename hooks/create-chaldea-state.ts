import { TargetKey } from '../interfaces/atlas-academy'
import { entries, fromEntries } from '../lib/typed-entries'

export type RangeState = {
  start: number
  end: number
}

export type TargetState = {
  disabled: boolean
  ranges: RangeState[]
}

export type ServantState = {
  disabled: boolean
  targets: {
    [target in TargetKey]: TargetState
  }
}

export type ChaldeaState = {
  [id: string]: ServantState
}

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

export const createServantState = (): ServantState => {
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

export const createChaldeaState = (ids: string[]): ChaldeaState => {
  const state = fromEntries(ids.map((id) => [id, createServantState()]))
  return state
}
