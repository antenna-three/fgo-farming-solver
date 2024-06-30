import { Input } from '@chakra-ui/input'
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react'
import {
  ChaldeaState,
  createChaldeaState,
  ServantState,
} from '../../hooks/create-chaldea-state'
import { noToMsId, msIdToNo } from '../../lib/to-ms-servant-id'
import { useSelectOnFocus } from '../../hooks/use-select-on-focus'
import { Servant } from '../../interfaces/atlas-academy'
import { orderBy } from '../../utils/order-by'
import { range } from '../../utils/range'

export const MsServantsIo = ({
  servants,
  state,
  setState,
}: {
  servants: Servant[]
  state: ChaldeaState
  setState: Dispatch<SetStateAction<ChaldeaState>>
}) => {
  const initialState = createChaldeaState([
    'all',
    ...servants.map(({ id }) => id.toString()),
  ])
  const msServants = useMemo(
    () =>
      Object.entries(state)
        .filter(
          ([id, { disabled, targets }]) =>
            !isNaN(Number(id)) && !disabled && targets
        )
        .map(([id, { targets }]) => [
          noToMsId(parseInt(id)),
          targets.ascension.ranges[0].start,
          targets.ascension.ranges[0].end,
          ...targets.skill.ranges.flatMap(({ start, end }) => [start, end]),
          //...targets.appendSkill.ranges.flatMap(({start, end}) => [start, end]),
          1,
          0,
        ])
        .sort(orderBy(([id]) => id)),
    [state]
  )
  const strMsServants = useMemo(
    () => (msServants.length == 0 ? '' : JSON.stringify(msServants)),
    [msServants]
  )
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (event) => {
      const { value } = event.currentTarget
      if (!value) {
        setState((state) =>
          Object.fromEntries(
            Object.entries(state).map(([id, { targets }]) => [
              id,
              { disabled: true, targets },
            ])
          )
        )
        return
      }
      let msServants_: number[][] = []
      try {
        const parsed = JSON.parse(value) as unknown
        if (
          !(
            Array.isArray(parsed) &&
            parsed.every(
              (servant): servant is number[] =>
                Array.isArray(servant) &&
                servant.every((status) => typeof status == 'number')
            )
          )
        ) {
          return
        }
        msServants_ = parsed
      } catch (e) {
        return
      }
      setState((state) => ({
        ...initialState,
        ...Object.fromEntries(
          msServants_
            .filter((msServant: number[]) => msIdToNo(msServant[0]) != null)
            .map((msServant: number[]) => {
              const id = msIdToNo(msServant[0])
              const ascentionRanges = { start: msServant[1], end: msServant[2] }
              const msSkill = msServant.slice(3, 9)
              const skillRanges = range(3).reduce(
                (acc, i) => [
                  ...acc,
                  { start: msSkill[i * 2], end: msSkill[i * 2 + 1] },
                ],
                [] as { start: number; end: number }[]
              )
              const newState: [number, ServantState] = [
                id,
                {
                  disabled: false,
                  targets: {
                    ascension: {
                      disabled: ascentionRanges.start == ascentionRanges.end,
                      ranges: [ascentionRanges],
                    },
                    skill: {
                      disabled: false,
                      ranges: skillRanges,
                    },
                    appendSkill:
                      id.toString() in state
                        ? state[id.toString()].targets.appendSkill
                        : {
                            disabled: false,
                            ranges: range(3).map(() => ({ start: 1, end: 10 })),
                          },
                  },
                },
              ]
              return newState
            })
        ),
      }))
    },
    [initialState, setState]
  )
  const selectOnFocus = useSelectOnFocus()

  return (
    <Input
      type="text"
      value={strMsServants}
      onChange={handleChange}
      onFocus={selectOnFocus}
    />
  )
}
