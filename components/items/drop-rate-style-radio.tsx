import {
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { DropRateStyle } from './item'

export const DropRateStyleRadio = ({
  dropRateStyle,
  setDropRateStyle,
}: {
  dropRateStyle: DropRateStyle
  setDropRateStyle: Dispatch<SetStateAction<DropRateStyle>>
}) => {
  const { t } = useTranslation('items')
  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">{t('表示形式')}</FormLabel>
      <RadioGroup
        value={dropRateStyle}
        onChange={(value) => {
          setDropRateStyle(value as DropRateStyle)
        }}
      >
        <HStack spacing={8}>
          <Radio value="ap">{t('AP効率')}</Radio>
          <Radio value="rate">{t('ドロップ率')}</Radio>
        </HStack>
      </RadioGroup>
    </FormControl>
  )
}
