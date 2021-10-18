/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const useLocalStorage = <T>(
  key: string,
  initialState: T,
  onGet?: (item: T) => T
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState(initialState)
  useEffect(() => {
    const json = localStorage.getItem(key)
    if (json) {
      let obj: T = JSON.parse(json)
      if (onGet != null) {
        obj = onGet(obj)
      }
      setState(obj)
    }
  }, [key])
  useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [state])
  return [state, setState]
}