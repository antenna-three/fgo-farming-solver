import { State } from '../components/material/servant-level-select'
import _ from 'lodash'

export const createMergeState = (initialState: State) => (state: State) =>
  state.all
    ? {
        ...Object.fromEntries(
          Object.entries(initialState).map(([id, { disabled }]) => [
            id,
            { disabled, targets: _.cloneDeep(state.all.targets) },
          ])
        ),
        ...state,
      }
    : { ...initialState, ...state }
