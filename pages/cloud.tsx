import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthButton } from '../components/common/auth-button'

const keys = [
  'material',
  'material/result',
  'posession',
  'input',
  'farming/results',
  'dropRateKey',
  'dropRateStyle',
]

const save = async (id: string) => {
  const body = JSON.stringify(
    Object.fromEntries(keys.map((key) => [key, localStorage.getItem(key)]))
  )
  await fetch(`/api/cloud/${id}`, { method: 'POST', body })
}

const load = async (id: string) => {
  await fetch(`/api/cloud/${id}`, { method: 'GET' })
    .then((res) => {
      if (res.status != 200) {
        throw 404
      } else {
        return res.json() as Promise<Record<string, string>>
      }
    })
    .then((obj) => {
      keys.forEach((key) => {
        localStorage.setItem(key, obj[key])
      })
    })
}

const Cloud = () => {
  const { t } = useTranslation('common')
  const { data: session } = useSession()
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false as boolean | 'failed')

  return (
    <VStack spacing={12} mt={12}>
      <Heading size="xl">{t('クラウドセーブ')}</Heading>

      <Text>{t('cloud-description')}</Text>

      <AuthButton />
      {session && (
        <HStack>
          <Button
            onClick={() => {
              setIsSaving(true)
              save(session?.user?.id ?? '').catch((error) =>
                console.error(error)
              )
              setIsSaved(true)
              setIsSaving(false)
            }}
            isLoading={isSaving}
            isDisabled={isSaved}
          >
            {t(isSaved ? '保存しました' : '保存')}
          </Button>
          <Button
            onClick={() => {
              setIsLoading(true)
              try {
                load(session?.user?.id ?? '').catch((error) =>
                  console.error(error)
                )
                setIsLoaded(true)
              } catch {
                setIsLoaded('failed')
              } finally {
                setIsLoading(false)
              }
            }}
            isLoading={isLoading}
            isDisabled={isLoaded != false}
          >
            {t(
              isLoaded == false
                ? '読み込み'
                : isLoaded == true
                ? '読み込みました'
                : 'データがありません'
            )}
          </Button>
        </HStack>
      )}
    </VStack>
  )
}

export default Cloud
