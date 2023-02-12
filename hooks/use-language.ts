import { useRouter } from 'next/router'
import { useEffect } from 'react'
import i18n from '../lib/i18n'

export const useLanguage = () => {
  const { locale } = useRouter()
  useEffect(() => void i18n.changeLanguage(locale), [locale])
}
