import React, { FormEventHandler, useCallback } from 'react'
import { Select } from '@chakra-ui/react'
import { jpClassNames } from '../../constants/jp-class-names'
import { useRouter } from 'next/router'

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
  const placeholder =
    currentClassName == null ? '個別設定' : jpClassNames[currentClassName]
  return (
    <>
      <Select placeholder={placeholder} onChange={onChange}>
        {currentClassName != null && <option value="">全体設定</option>}
        {Object.entries(jpClassNames)
          .filter(([className]) => className != currentClassName)
          .map(([className, jpClassName]) => (
            <option key={className} value={className}>
              {jpClassName}
            </option>
          ))}
      </Select>
    </>
  )
}
