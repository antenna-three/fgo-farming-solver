import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { HStack, Radio, RadioGroup } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const values = [
  ['ap', '消費AP'],
  ['lap', '周回数'],
]

export const ObjectiveFieldset = ({
  objective,
  setObjective,
}: {
  objective: string
  setObjective: (objective: string) => void
}) => {
  const { t } = useTranslation('farming')

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">{t('最小化')}</FormLabel>
      <RadioGroup name="objective" value={objective} onChange={setObjective}>
        <HStack spacing={4}>
          {values.map(([value, description]) => (
            <Radio key={value} value={value}>
              {t(description)}
            </Radio>
          ))}
        </HStack>
      </RadioGroup>
    </FormControl>
  )
}
