import {
  FormControl,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  VStack,
} from '@chakra-ui/react'
import React, { Fragment } from 'react'

export const DropRateSelect = ({
  dropMergeMethod,
  setDropMergeMethod,
}: {
  dropMergeMethod: string
  setDropMergeMethod: (dropMergeMethod: string) => void
}) => {
  const options = [
    {
      value: 'add',
      label: '旧データ＋新データ',
      description:
        'ドロップ率が上がる前と上がった後のデータを合算します。旧データと新データの中間の結果になります。',
    },
    {
      value: '1',
      label: '旧データを優先',
      description:
        'ドロップ率が上がる前のデータを優先します。サンプル数が大きく信頼度が高いですが、ドロップ率が現在より低くなります。',
    },
    {
      value: '2',
      label: '新データを優先',
      description:
        'ドロップ率が上がった後のデータを優先します。最新のドロップ率を反映しますが、サンプル数が小さく信頼度が低い場合があります。',
    },
  ]
  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">ドロップ率</FormLabel>
      <RadioGroup value={dropMergeMethod} onChange={setDropMergeMethod}>
        <VStack alignItems="start" spacing={4}>
          {options.map(({ value, label, description }) => (
            <Radio value={value} key={value}>
              {label}
              <FormHelperText>{description}</FormHelperText>
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
    </FormControl>
  )
}
