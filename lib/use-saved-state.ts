import { useState } from "react";

export function useSavedState<S>(initialState: S, name: string): [S, (newState: S) => void] {
    const savedState = initialState
    const [state, setState] = useState(savedState)
    const setSaveState = (newState: S) => {
        setState(newState)
        localStorage.setItem(name, JSON.stringify(newState))
    }
    return [state, setSaveState]
}

export function loadSavedState<S>(setState: (state: S) => void, name: string, defaultState?: S) {
    setState(JSON.parse(localStorage.getItem(name) || 'null') || defaultState)
}