import { Dispatch, SetStateAction, useMemo } from 'react'
import { ChaldeaState, createChaldeaState } from './create-chaldea-state'
import { useChaldeaStateMarger } from './use-chaldea-state-merger'
import { useLocalStorage } from './use-local-storage'

export const useChaldeaState = (
  ids: string[]
): [ChaldeaState, Dispatch<SetStateAction<ChaldeaState>>] => {
  const initialState = useMemo(() => createChaldeaState(['all', ...ids]), [ids])
  const mergeState = useChaldeaStateMarger(initialState)
  const [state, setState] = useLocalStorage(
    'material',
    initialState,
    mergeState
  )
  return [state, setState]
}
