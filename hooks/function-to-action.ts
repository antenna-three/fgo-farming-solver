import { SetStateAction, Dispatch } from 'react'

const isFunction = <T>(
  value: SetStateAction<T>
): value is (prevState: T) => T => typeof value == 'function'

export const functionToAction =
  <T>(func: Dispatch<(prevState: T) => T>): Dispatch<SetStateAction<T>> =>
  (value) =>
    isFunction(value) ? func(value) : func(() => value)
