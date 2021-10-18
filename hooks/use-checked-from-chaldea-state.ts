import { functionToAction } from './function-to-action'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { LeafState } from './use-checkbox-tree'
import { ChaldeaState } from './create-chaldea-state'

const _chaldeaStateToChecked = (state: ChaldeaState): LeafState =>
  Object.fromEntries(
    Object.entries(state)
      .filter(([id, _]) => id != 'all')
      .map(([id, { disabled }]) => [id, !disabled])
  )

const _setChaldeaStateToChecked = (
  setState: Dispatch<SetStateAction<ChaldeaState>>
): Dispatch<SetStateAction<LeafState>> => {
  const functional = (updateChecked: (prevChecked: LeafState) => LeafState) =>
    setState((state) => ({
      ...state,
      ...Object.fromEntries(
        Object.entries(state).map(([id, servantState]) => [
          [id],
          {
            ...servantState,
            disabled: updateChecked(_chaldeaStateToChecked(state))[id] == false,
          },
        ])
      ),
    }))
  return functionToAction(functional)
}

export const useChecked = (
  state: ChaldeaState,
  setState: Dispatch<SetStateAction<ChaldeaState>>
): [LeafState, Dispatch<SetStateAction<LeafState>>] => [
  useMemo(() => _chaldeaStateToChecked(state), [state]),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => _setChaldeaStateToChecked(setState), []),
]
