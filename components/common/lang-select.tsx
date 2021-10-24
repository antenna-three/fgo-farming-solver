import { useRouter } from 'next/router'
import React from 'react'
import { Link } from './link'

export const LangSelect = () => {
  const { pathname, query, locale } = useRouter()
  const nextLocale = locale == 'en' ? 'ja' : 'en'
  const url = { pathname, query }
  const label = locale == 'en' ? '日本語' : 'English'
  return (
    <Link href={url} locale={nextLocale}>
      {label}
    </Link>
  )
}
