import { SetStateAction, Dispatch, useCallback } from 'react'

const isFunction = <T>(
  value: SetStateAction<T>
): value is (prevState: T) => T => typeof value == 'function'

export const useAction = <T>(
  func: Dispatch<(prevState: T) => T>
): Dispatch<SetStateAction<T>> =>
  useCallback(
    (value) => (isFunction(value) ? func(value) : func(() => value)),
    [func]
  )
