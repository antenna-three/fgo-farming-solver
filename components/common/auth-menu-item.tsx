import { Image, MenuItem } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'

export const AuthMenuItem = () => {
  const { data: session } = useSession()
  const { t } = useTranslation('common')
  if (session) {
    return (
      <MenuItem onClick={() => signOut()}>
        <Image
          boxSize={6}
          borderRadius="full"
          src={session.user?.image ?? undefined}
          alt="Your profile"
          mr="12px"
        />
        <span>{t('サインアウト')}</span>
      </MenuItem>
    )
  }
  return (
    <MenuItem onClick={() => signIn('twitter')}>{t('サインイン')}</MenuItem>
  )
}
