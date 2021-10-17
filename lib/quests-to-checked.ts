import { functionToAction } from './function-to-action'
import { Dispatch, SetStateAction } from 'react'
import { LeafState } from './use-checkbox-tree'

const _questsToChecked = (
  questIds: string[],
  checkedQuests: string[]
): LeafState =>
  Object.fromEntries(questIds.map((id) => [id, checkedQuests.includes(id)]))

const _questsToSetChecked = <T extends { quests: string[] }>(
  questIds: string[],
  setInputState: Dispatch<SetStateAction<T>>
) => {
  const functional = (action: (state: LeafState) => LeafState) =>
    setInputState((state) => ({
      ...state,
      quests: Object.entries(action(_questsToChecked(questIds, state.quests)))
        .filter(([id, checked]) => checked)
        .map(([id, checked]) => id),
    }))
  return functionToAction(functional)
}

export const questsToChecked = <T extends { quests: string[] }>(
  questIds: string[],
  checkedQuests: string[],
  setInputState: Dispatch<SetStateAction<T>>
): [LeafState, Dispatch<SetStateAction<LeafState>>] => [
  _questsToChecked(questIds, checkedQuests),
  _questsToSetChecked(questIds, setInputState),
]
