import { MenuItem } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const LangMenuItem = () => {
  const { pathname, query, locale } = useRouter()
  const nextLocale = locale == 'en' ? 'ja' : 'en'
  const url = { pathname, query }
  const label = locale == 'en' ? '日本語' : 'English'
  return (
    <Link href={url} locale={nextLocale}>
      <a>
        <MenuItem>{label}</MenuItem>
      </a>
    </Link>
  )
}
