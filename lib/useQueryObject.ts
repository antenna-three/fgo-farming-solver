import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'

export const useQueryObject = <State extends {[key: string]: string}>(defaultState: State) => {
  const router = useRouter()

  const [state, setState] = useState(defaultState)

  const setQuery = useCallback(
    (newState: State) => {
      setState(newState)
      router.replace({ query: newState }, undefined, { scroll: false, shallow: true })
    },
    [router],
  )

  return [state, setQuery] as const
}