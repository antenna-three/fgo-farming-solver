/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const useLocalStorage = <T>(
  key: string,
  initialState: T,
  options?: {
    onGet?: (item: T) => T
    useInitial?: boolean
  }
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState(initialState)
  useEffect(() => {
    if (options?.useInitial) return
    const json = localStorage.getItem(key)
    if (json) {
      let obj = JSON.parse(json) as T
      if (options?.onGet != null) {
        obj = options.onGet(obj)
      }
      setState(obj)
    }
  }, [key])
  useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [state])
  return [state, setState]
}
