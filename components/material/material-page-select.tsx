import React, { FormEventHandler } from 'react'
import {
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from '@chakra-ui/react'
import { jpClassNames } from '../../constants/jp-class-names'
import { Link } from '../common/link'
import { useRouter } from 'next/router'

export const PageSelect = ({
  currentClassName,
}: {
  currentClassName?: string
}) => {
  const router = useRouter()
  const onChange: FormEventHandler<HTMLSelectElement> = (event) => {
    const { value } = event.currentTarget
    router.push(`/material/${value}`)
  }
  const placeholder =
    currentClassName == null ? '個別設定' : jpClassNames[currentClassName]
  return (
    <>
      <Select placeholder={placeholder} onChange={onChange}>
        {currentClassName != null && <option value="">全体設定</option>}
        {Object.entries(jpClassNames)
          .filter(([className, jpClassName]) => className != currentClassName)
          .map(([className, jpClassName]) => (
            <option key={className} value={className}>
              {jpClassName}
            </option>
          ))}
      </Select>
    </>
  )
}
