import { Checkbox } from '@chakra-ui/checkbox'
import { VStack } from '@chakra-ui/layout'
import {
  Skeleton,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import React, { FormEventHandler, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const ResultStat = ({
  totalLap,
  totalAp,
}: {
  totalLap: number
  totalAp: number
}) => {
  const [showSum, setShowSum] = useState(false)
  const handleChange: FormEventHandler<HTMLInputElement> = (event) => {
    const { checked } = event.currentTarget
    setShowSum(checked)
  }
  const { t } = useTranslation('farming')

  return (
    <VStack>
      <Checkbox isChecked={showSum} onChange={handleChange}>
        {t('表示')}
      </Checkbox>
      <StatGroup>
        {[
          { label: '周回数', value: totalLap },
          { label: 'AP', value: totalAp },
          { label: '聖晶石', value: Math.round(totalAp / 144) },
          {
            label: '費用',
            value: `¥${Math.round((totalAp / 144 / 168) * 10000)}`,
          },
        ].map(({ label, value }) => (
          <Stat flexWrap="wrap" key={label} m={5}>
            <StatLabel>{t(label)}</StatLabel>
            <Skeleton h="32px" isLoaded={showSum} fadeDuration={1}>
              <StatNumber>{value}</StatNumber>
            </Skeleton>
          </Stat>
        ))}
      </StatGroup>
    </VStack>
  )
}
