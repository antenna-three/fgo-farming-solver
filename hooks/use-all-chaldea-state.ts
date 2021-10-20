import { Dispatch, SetStateAction, useCallback } from 'react'
import { ChaldeaState, ServantState } from './create-chaldea-state'
import { functionToAction } from './function-to-action'

export const useAllChaldeaState = (
  setChaldeaState: Dispatch<SetStateAction<ChaldeaState>>
) => {
  const setAllStateFunction = useCallback(
    (updateServantState: (prevServantState: ServantState) => ServantState) => {
      setChaldeaState((prevState) =>
        Object.fromEntries(
          Object.entries(prevState).map(([id, prevServantState]) => [
            id,
            updateServantState(prevServantState),
          ])
        )
      )
    },
    [setChaldeaState]
  )
  return functionToAction(setAllStateFunction)
}
