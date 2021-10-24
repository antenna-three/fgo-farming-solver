import React, { FormEventHandler, useCallback } from 'react'
import { Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { classNames } from '../../lib/class-names'

export const PageSelect = ({
  currentClassName,
}: {
  currentClassName?: string
}) => {
  const router = useRouter()
  const onChange: FormEventHandler<HTMLSelectElement> = useCallback(
    (event) => {
      const { value } = event.currentTarget
      router.push(`/material/${value}`)
    },
    [router]
  )
  const { t } = useTranslation('material')
  const localClassNames = classNames[router.locale ?? 'ja']
  const placeholder =
    currentClassName == null ? t('個別設定') : localClassNames[currentClassName]

  return (
    <>
      <Select placeholder={placeholder} onChange={onChange}>
        {currentClassName != null && <option value="">{t('全体設定')}</option>}
        {Object.entries(localClassNames)
          .filter(([className]) => className != currentClassName)
          .map(([className, localClassName]) => (
            <option key={className} value={className}>
              {localClassName}
            </option>
          ))}
      </Select>
    </>
  )
}
