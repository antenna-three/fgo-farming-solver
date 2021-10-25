import {
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { DropRateKey } from '../../interfaces/fgodrop'

export const DropRateKeyRadio = ({
  dropRateKey,
  setDropRateKey,
}: {
  dropRateKey: DropRateKey
  setDropRateKey: Dispatch<SetStateAction<DropRateKey>>
}) => {
  const { t } = useTranslation('items')
  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">{t('ドロップ率')}</FormLabel>
      <RadioGroup
        value={dropRateKey}
        onChange={(value) => {
          setDropRateKey(value as DropRateKey)
        }}
      >
        <HStack spacing={8}>
          <Radio value="1">{t('旧データ')}</Radio>
          <Radio value="2">{t('新データ')}</Radio>
        </HStack>
      </RadioGroup>
    </FormControl>
  )
}
