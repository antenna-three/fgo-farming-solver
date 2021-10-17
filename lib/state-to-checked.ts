import { functionToAction } from './function-to-action'
import { Dispatch, SetStateAction } from 'react'
import { State } from '../components/material/servant-level-select'
import { LeafState } from './use-checkbox-tree'

const _stateToChecked = (state: State): LeafState =>
  Object.fromEntries(
    Object.entries(state)
      .filter(([id, _]) => id != 'all')
      .map(([id, { disabled }]) => [id, !disabled])
  )

const _setStateToSetChecked = (
  setState: Dispatch<SetStateAction<State>>
): Dispatch<SetStateAction<LeafState>> => {
  const functional = (updateChecked: (prevChecked: LeafState) => LeafState) =>
    setState((state) => ({
      ...state,
      ...Object.fromEntries(
        Object.entries(state).map(([id, servantState]) => [
          [id],
          {
            ...servantState,
            disabled: updateChecked(_stateToChecked(state))[id] == false,
          },
        ])
      ),
    }))
  return functionToAction(functional)
}

export const stateToChecked = (
  state: State,
  setState: Dispatch<SetStateAction<State>>
): [LeafState, Dispatch<SetStateAction<LeafState>>] => [
  _stateToChecked(state),
  _setStateToSetChecked(setState),
]
