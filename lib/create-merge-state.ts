import { State } from "../components/servant-level-select";

export const createMergeState = (initialState: State) => (
    (s: State) => (
        s.all 
        ? {
            ...Object.fromEntries(Object.entries(initialState)
                .map(([id, {disabled}]) => ([id, {disabled, targets: s.all.targets}]))),
            ...s
        }
        : {...initialState, ...s}
    )
)