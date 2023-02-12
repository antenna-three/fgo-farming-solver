import { useRouter } from 'next/router'
import { useCallback } from 'react'

export const useToggleLocale = () => {
  const router = useRouter()
  const nextLocale = router.locale == 'en' ? 'ja' : 'en'
  return [
    router.locale,
    useCallback(
      () => router.push(router.asPath, undefined, { locale: nextLocale }),
      [nextLocale, router]
    ),
  ] as const
}
