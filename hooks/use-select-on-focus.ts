import { FocusEventHandler, useCallback } from 'react'

export const useSelectOnFocus = (): FocusEventHandler<
  HTMLInputElement | HTMLTextAreaElement
> =>
  useCallback((event) => {
    event.currentTarget.select()
  }, [])
