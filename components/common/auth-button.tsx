import { Button, Image } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { FaTwitter } from 'react-icons/fa'

export const AuthButton = () => {
  const { data: session } = useSession()
  const { t } = useTranslation('common')
  if (session) {
    return (
      <Button
        onClick={() => signOut()}
        size="lg"
        colorScheme="twitter"
        leftIcon={
          <Image
            boxSize={8}
            borderRadius="full"
            src={session.user?.image ?? undefined}
            alt="Your profile"
          />
        }
      >
        {t('サインアウト')}
      </Button>
    )
  }
  return (
    <Button
      onClick={() => signIn('twitter')}
      size="lg"
      colorScheme="twitter"
      leftIcon={<FaTwitter />}
    >
      {t('サインイン')}
    </Button>
  )
}
