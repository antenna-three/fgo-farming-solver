import { State } from '../components/servant-level-select'
import _ from 'lodash'

export const createMergeState = (initialState: State) => (s: State) =>
  s.all
    ? {
        ...Object.fromEntries(
          Object.entries(initialState).map(([id, { disabled }]) => [
            id,
            { disabled, targets: _.cloneDeep(s.all.targets) },
          ])
        ),
        ...s,
      }
    : { ...initialState, ...s }
