import { Dispatch, SetStateAction, useMemo } from 'react'
import { functionToAction } from './function-to-action'
import { LeafState } from './use-checkbox-tree'

const _questsToChecked = (
  questIds: string[],
  checkedQuests: string[]
): LeafState =>
  Object.fromEntries(questIds.map((id) => [id, checkedQuests.includes(id)]))

const _questsToSetChecked = (
  questIds: string[],
  setCheckedQuests: Dispatch<SetStateAction<string[]>>
) => {
  const functional = (action: (state: LeafState) => LeafState) =>
    setCheckedQuests((quests) =>
      Object.entries(action(_questsToChecked(questIds, quests)))
        .filter(([, checked]) => checked)
        .map(([id]) => id)
    )
  return functionToAction(functional)
}

export const useChecked = (
  questIds: string[],
  checkedQuests: string[],
  setCheckedQuests: Dispatch<SetStateAction<string[]>>
): [LeafState, Dispatch<SetStateAction<LeafState>>] => [
  useMemo(
    () => _questsToChecked(questIds, checkedQuests),
    [checkedQuests, questIds]
  ),
  useMemo(
    () => _questsToSetChecked(questIds, setCheckedQuests),
    [questIds, setCheckedQuests]
  ),
]
