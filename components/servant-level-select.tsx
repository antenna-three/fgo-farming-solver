import { FormEvent, memo, SetStateAction, useCallback, useMemo } from 'react'
import Link from 'next/link'
import DualSliderWithInput from './dual-slider-with-input'

export type ServantState = {
  disabled: boolean
  targets: {
    [target: string]: {
      disabled: boolean
      ranges: {
        start: number
        end: number
      }[]
    }
  }
}

export type State = { [id: string]: ServantState }

const ServantLevelSelect = ({
  id,
  name,
  servantState,
  setState,
  setServantState,
}: {
  id: string
  name: string
  servantState: ServantState
  setState: (value: SetStateAction<State>) => void,
  setServantState?: (dispatch: (servantState: ServantState) => ServantState) => void,
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
  const setServantStateSafe = useMemo(() => setServantState || ((dispatch: (servantState: ServantState) => ServantState) => {
      setState((state) => ({
        ...state,
        [id]: { ...state[id], ...dispatch(state[id]) },
      }))
    }), [id, setServantState, setState])
  const handleChangeDisabled = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const [id, target] = e.currentTarget.name.split('-')
      const disabled = !e.currentTarget.checked
      setServantStateSafe((state) => ({
        ...state,
        targets: {
          ...state.targets,
          [target]: {
            ...state.targets[target],
            disabled,
          },
        },
      }))
    },
    [setServantStateSafe]
  )
  const handleLeftChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const [id, target, index] = e.currentTarget.name.split('-')
      const indexAsNumber = parseInt(index)
      const { valueAsNumber } = e.currentTarget
      setServantStateSafe((state) => ({
        ...state,
        targets: {
          ...state.targets,
          [target]: {
            ...state.targets[target],
            ranges: state.targets[target].ranges.map((range, i) =>
              i == indexAsNumber
                ? { start: valueAsNumber, end: range.end }
                : range
            ),
          },
        },
      }))
    },
    [setServantStateSafe]
  )
  const handleRightChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const [id, target, index] = e.currentTarget.name.split('-')
      const indexAsNumber = parseInt(index)
      const { valueAsNumber } = e.currentTarget
      setServantStateSafe((state) => ({
        ...state,
        targets: {
          ...state.targets,
          [target]: {
            ...state.targets[target],
            ranges: state.targets[target].ranges.map((range, i) =>
              i == indexAsNumber
                ? { start: range.start, end: valueAsNumber }
                : range
            ),
          },
        },
      }))
    },
    [setServantStateSafe]
  )

  return (
    <>
      <h2>
        <Link href={`/servants/${id == 'all' ? '' : id}`}>{name}</Link>
      </h2>
      <div style={{ marginBottom: '2rem' }}>
        {Object.entries(servantState.targets).map(
          ([target, { disabled, ranges }]) => (
            <div className="target" key={`${id}-${target}`}>
              <input
                type="checkbox"
                id={`${id}-${target}`}
                name={`${id}-${target}`}
                checked={!disabled}
                onChange={handleChangeDisabled}
              />
              <label htmlFor={`${id}-${target}`}>{labels[target]}</label>
              {ranges.map(({ start, end }, index) => (
                <DualSliderWithInput
                  min={mins[target]}
                  max={maxs[target]}
                  step={1}
                  disabled={disabled}
                  name={`${id}-${target}-${index}`}
                  leftValue={start}
                  rightValue={end}
                  handleLeftChange={handleLeftChange}
                  handleRightChange={handleRightChange}
                  key={`${id}-${target}-${index}`}
                />
              ))}
            </div>
          )
        )}
      </div>
      <style jsx>{`
        .target {
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  )
}

export default memo(ServantLevelSelect)
