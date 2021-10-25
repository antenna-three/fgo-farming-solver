import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en.json'
import ja from '../locales/ja.json'

i18n.use(initReactI18next).init({
  resources: { en, ja },
  fallbackLng: 'ja',
  interpolation: { escapeValue: false },
})

export default i18n
