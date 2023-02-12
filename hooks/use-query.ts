import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'

export const useQuery = <
  ParsedUrlQuery extends NodeJS.Dict<string | string[]>
>() => {
  const router = useRouter()

  const initialState = router.query

  const [state, setState] = useState(initialState)

  const setQuery = useCallback(
    async (newState: ParsedUrlQuery) => {
      setState(newState)
      await router.replace({ query: newState }, undefined, {
        scroll: false,
        shallow: true,
      })
    },
    [router]
  )

  return [state, setQuery] as const
}
