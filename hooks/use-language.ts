import { useRouter } from 'next/router'
import { useMemo } from 'react'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en.json'
import ja from '../locales/ja.json'

i18next.use(initReactI18next).init({
  resources: { en, ja },
  fallbackLng: 'ja',
  interpolation: { escapeValue: false },
})

export const useLanguage = () => {
  const { locale } = useRouter()
  useMemo(() => i18next.changeLanguage(locale), [locale])
}
