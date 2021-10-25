import React, { Dispatch, FormEventHandler, memo } from 'react'
import { RangeSliderWithInput } from './range-slider-with-input'
import { Checkbox, VStack } from '@chakra-ui/react'
import { TargetKey } from '../../interfaces/atlas-academy'
import { ServantState, TargetState } from '../../hooks/create-chaldea-state'
import { useTranslation } from 'react-i18next'

const labels: { [key: string]: string } = {
  ascension: '再臨',
  skill: 'スキル',
  appendSkill: 'アペンドスキル',
}
const mins: { [key: string]: number } = {
  ascension: 0,
  skill: 1,
  appendSkill: 1,
}
const maxs: { [key: string]: number } = {
  ascension: 4,
  skill: 10,
  appendSkill: 10,
}

const _TargetLevelSelect = ({
  id,
  target,
  state: { disabled, ranges },
  handleChangeDisabled,
  setServantState,
}: {
  id: string
  target: TargetKey
  state: TargetState
  handleChangeDisabled: FormEventHandler<HTMLInputElement>
  setServantState: Dispatch<(state: ServantState) => ServantState>
}) => {
  const { t } = useTranslation('common')
  return (
    <VStack align="stretch" key={`${id}-${target}`}>
      <Checkbox
        name={`${id}-${target}`}
        isChecked={!disabled}
        onChange={handleChangeDisabled}
      >
        {t(target)}
      </Checkbox>
      {ranges.map(({ start, end }, index) => (
        <RangeSliderWithInput
          min={mins[target]}
          max={maxs[target]}
          step={1}
          disabled={disabled}
          name={`${id}-${target}-${index}`}
          value={[start, end]}
          setValue={(value) => {
            setServantState((state) => ({
              ...state,
              targets: {
                ...state.targets,
                [target]: {
                  ...state.targets[target],
                  ranges: state.targets[target].ranges.map((range, i) =>
                    i == index
                      ? {
                          start: value[0],
                          end: value[1],
                        }
                      : range
                  ),
                },
              },
            }))
          }}
          key={`${id}-${target}-${index}`}
        />
      ))}
    </VStack>
  )
}

export const TargetLevelSelect = memo(_TargetLevelSelect)
