import { useAction } from './use-action'
import { Dispatch, SetStateAction, useMemo } from 'react'
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
  return useAction(functional)
}

export const useChecked = <T extends { quests: string[] }>(
  questIds: string[],
  checkedQuests: string[],
  setInputState: Dispatch<SetStateAction<T>>
): [LeafState, Dispatch<SetStateAction<LeafState>>] => [
  useMemo(
    () => _questsToChecked(questIds, checkedQuests),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkedQuests]
  ),
  useMemo(
    () => _questsToSetChecked(questIds, setInputState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  ),
]
