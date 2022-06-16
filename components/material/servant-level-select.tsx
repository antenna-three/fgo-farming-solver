import { VStack } from '@chakra-ui/react'
import React, {
  Dispatch,
  FormEvent,
  memo,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react'
import { ChaldeaState, ServantState } from '../../hooks/create-chaldea-state'
import { TargetKey } from '../../interfaces/atlas-academy'
import { entries } from '../../utils/typed-entries'
import { TargetLevelSelect } from './target-level-select'

const _ServantLevelSelect = ({
  id,
  servantState,
  setState,
  setServantState,
}: {
  id: string
  servantState: ServantState
  setState: Dispatch<SetStateAction<ChaldeaState>>
  setServantState?: (
    dispatch: (servantState: ServantState) => ServantState
  ) => void
}) => {
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
      const [, target] = e.currentTarget.name.split('-')
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
      {entries(servantState.targets).map(([target, state]) => (
        <TargetLevelSelect
          id={id}
          target={target}
          state={state}
          handleChangeDisabled={handleChangeDisabled}
          setServantState={setServantStateSafe}
          key={`${id}-${target}`}
        />
      ))}
    </VStack>
  )
}

export const ServantLevelSelect = memo(_ServantLevelSelect)
