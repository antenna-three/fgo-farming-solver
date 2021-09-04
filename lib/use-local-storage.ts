import { Dispatch, SetStateAction, useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialState: T): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState(initialState)
    useEffect(() => {
        const json = localStorage.getItem(key)
        if (json) {
            const obj = JSON.parse(json)
            setState({...initialState, ...obj})
        }
    }, [])
    useEffect(() => (
        localStorage.setItem(key, JSON.stringify(state))
    ), [state])
    return [state, setState]
}