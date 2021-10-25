import { useRouter } from 'next/router'
import { useMemo } from 'react'
import i18n from '../lib/i18n'

export const useLanguage = () => {
  const { locale } = useRouter()
  useMemo(() => i18n.changeLanguage(locale), [locale])
}
