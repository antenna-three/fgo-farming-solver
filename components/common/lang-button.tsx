import { IconButton } from '@chakra-ui/button'
import { MdTranslate } from 'react-icons/md'
import { useToggleLocale } from '../../hooks/use-toggle-locale'

export const LangButton = () => {
  const [locale, toggleLocale] = useToggleLocale()
  const label = locale == 'en' ? '言語を変更' : 'Change language'

  return (
    <IconButton
      onClick={toggleLocale}
      aria-label={label}
      icon={<MdTranslate />}
      variant="ghost"
      size="lg"
    />
  )
}
