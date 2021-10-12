import React, {
  FormEvent,
  memo,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react'
import { RangeSliderWithInput } from './range-slider-with-input'
import { Checkbox, Heading, VStack } from '@chakra-ui/react'
import { TargetKey } from '../../interfaces/atlas-academy'
import { entries } from '../../lib/typed-entries'

export type ServantState = {
  disabled: boolean
  targets: {
    [target in TargetKey]: {
      disabled: boolean
      ranges: {
        start: number
        end: number
      }[]
    }
  }
}

export type State = { [id: string]: ServantState }

const _ServantLevelSelect = ({
  id,
  servantState,
  setState,
  setServantState,
}: {
  id: string
  servantState: ServantState
  setState: (value: SetStateAction<State>) => void
  setServantState?: (
    dispatch: (servantState: ServantState) => ServantState
  ) => void
}) => {
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
  const setServantStateSafe = useMemo(
    () =>
      setServantState ||
      ((dispatch: (servantState: ServantState) => ServantState) => {
        setState((state) => ({
          ...state,
          [id]: { ...state[id], ...dispatch(state[id]) },
        }))
      }),
    [id, setServantState, setState]
  )
  const handleChangeDisabled = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const [id, target] = e.currentTarget.name.split('-')
      const disabled = !e.currentTarget.checked
      setServantStateSafe((state) => ({
        ...state,
        targets: {
          ...state.targets,
          [target]: {
            ...state.targets[target as TargetKey],
            disabled,
          },
        },
      }))
    },
    [setServantStateSafe]
  )

  return (
    <VStack align="stretch" spacing={4}>
      {entries(servantState.targets).map(([target, { disabled, ranges }]) => {
        if (ranges == null) console.log([target, { disabled }])
        return (
          <VStack align="stretch" key={`${id}-${target}`}>
            <Checkbox
              name={`${id}-${target}`}
              isChecked={!disabled}
              onChange={handleChangeDisabled}
            >
              {labels[target]}
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
                  setServantStateSafe((state) => ({
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
      })}
    </VStack>
  )
}

export const ServantLevelSelect = memo(_ServantLevelSelect)
