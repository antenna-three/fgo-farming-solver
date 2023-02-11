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
  'objective',
  'items',
  'quests',
  'halfDailyAp',
  'dropMergeMethod',
  'farming/results',
  'dropRateKey',
  'dropRateStyle',
]

const save = async () => {
  const body = JSON.stringify(
    Object.fromEntries(
      keys
        .map((key) => [key, localStorage.getItem(key)])
        .filter(([, value]) => value)
    )
  )
  await fetch(`/api/cloud`, { method: 'POST', body, credentials: 'include' })
}

const load = async () => {
  const res = await fetch(`/api/cloud`, { credentials: 'include' })
  if (res.status != 200) {
    throw new Error()
  }
  const obj = (await res.json()) as Record<string, string>
  keys.forEach((key) => {
    if (obj[key] != null) {
      localStorage.setItem(key, obj[key])
    } else {
      localStorage.removeItem(key)
    }
  })
}

const Cloud = () => {
  const { t } = useTranslation('common')
  const { data: session } = useSession()
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false as boolean | 'failed')
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
              save()
                .then(() => setIsSaved(true))
                .catch(() => setIsSaved('failed'))
                .finally(() => setIsSaving(false))
            }}
            isLoading={isSaving}
            isDisabled={isSaved !== false}
          >
            {t(
              isSaved === false
                ? '保存'
                : isSaved === true
                ? '保存しました'
                : '保存に失敗しました'
            )}
          </Button>
          <Button
            onClick={() => {
              setIsLoading(true)
              load()
                .then(() => setIsLoaded(true))
                .catch(() => setIsLoaded('failed'))
                .finally(() => setIsLoading(false))
            }}
            isLoading={isLoading}
            isDisabled={isLoaded !== false}
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
