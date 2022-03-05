import { IconButton } from '@chakra-ui/button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { MdTranslate } from 'react-icons/md'

export const LangButton = () => {
  const { pathname, query, locale } = useRouter()
  const nextLocale = locale == 'en' ? 'ja' : 'en'
  const url = { pathname, query }
  const label = locale == 'en' ? '言語を変更' : 'Change language'
  return (
    <Link href={url} locale={nextLocale} passHref>
      <IconButton
        as="a"
        aria-label={label}
        icon={<MdTranslate />}
        variant="ghost"
        size="lg"
      />
    </Link>
  )
}
