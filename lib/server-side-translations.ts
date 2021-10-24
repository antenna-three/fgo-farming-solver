import { UserConfig } from 'next-i18next'
import { serverSideTranslations as nextServerSideTranslations } from 'next-i18next/serverSideTranslations'

export const serverSideTranslations = (
  initialLocale: string = 'ja',
  namespaceRequired?: string[],
  configOverride?: UserConfig
) =>
  nextServerSideTranslations(initialLocale, namespaceRequired, configOverride)
