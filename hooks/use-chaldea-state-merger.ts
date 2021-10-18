import { useCallback } from 'react'
import { ChaldeaState } from './create-chaldea-state'

export const useChaldeaStateMarger = (initialState: ChaldeaState) =>
  useCallback(
    (state: ChaldeaState): ChaldeaState =>
      state.all
        ? {
            ...Object.fromEntries(
              Object.entries(initialState).map(([id, { disabled }]) => [
                id,
                {
                  disabled,
                  targets: JSON.parse(JSON.stringify(state.all.targets)),
                },
              ])
            ),
            ...state,
          }
        : { ...initialState, ...state },
    [initialState]
  )
