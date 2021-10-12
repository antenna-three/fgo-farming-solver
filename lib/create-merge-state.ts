import { State } from '../components/material/servant-level-select'

export const createMergeState = (initialState: State) => (state: State) =>
  state.all
    ? {
        ...Object.fromEntries(
          Object.entries(initialState).map(([id, { disabled }]) => [
            id,
            { disabled, targets: state.all.targets },
          ])
        ),
        ...state,
      }
    : { ...initialState, ...state }
