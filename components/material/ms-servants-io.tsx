import { ChangeEventHandler, Dispatch, SetStateAction } from 'react'
import { selectOnFocus } from '../../lib/select-on-focus'
import { Servant } from '../../interfaces/atlas-academy'
import { getMsServantIdConverter } from '../../lib/get-ms-servant-id-converter'
import { range } from '../../lib/range'
import { Input } from '@chakra-ui/input'
import {
  ChaldeaState,
  createChaldeaState,
} from '../../hooks/create-chaldea-state'

export const MsServantsIo = ({
  servants,
  state,
  setState,
}: {
  servants: Servant[]
  state: ChaldeaState
  setState: Dispatch<SetStateAction<ChaldeaState>>
}) => {
  const { getId, getMsId } = getMsServantIdConverter(servants)
  const initialState = createChaldeaState([
    'all',
    ...servants.map(({ id }) => id.toString()),
  ])
  const msServants = Object.entries(state)
    .filter(
      ([id, { disabled, targets }]) =>
        !isNaN(Number(id)) && !disabled && targets
    )
    .map(([id, { targets }]) => [
      getMsId(parseInt(id)),
      targets.ascension.ranges[0].start,
      targets.ascension.ranges[0].end,
      ...targets.skill.ranges.flatMap(({ start, end }) => [start, end]),
      //...targets.appendSkill.ranges.flatMap(({start, end}) => [start, end]),
      1,
      0,
    ])
    .sort((a, b) => a[0] - b[0])
  const strMsServants = msServants.length == 0 ? '' : JSON.stringify(msServants)
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
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
      msServants_ = JSON.parse(value)
    } catch (e) {
      return
    }
    if (
      !(
        Array.isArray(msServants_) &&
        msServants_.every((item) => Array.isArray(item))
      )
    ) {
      return
    }
    setState((state) => ({
      ...initialState,
      ...Object.fromEntries(
        msServants_
          .filter((msServant: number[]) => getId(msServant[0]) != null)
          .map((msServant: number[]) => {
            const id = getId(msServant[0])
            const ascentionRanges = { start: msServant[1], end: msServant[2] }
            const msSkill = msServant.slice(3, 9)
            const skillRanges = range(3).reduce(
              (acc, i) => [
                ...acc,
                { start: msSkill[i * 2], end: msSkill[i * 2 + 1] },
              ],
              [] as { start: number; end: number }[]
            )
            const newState = [
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
                      : range(3).map(() => ({ start: 1, end: 10 })),
                },
              },
            ]
            return newState
          })
      ),
    }))
  }
  return (
    <Input
      type="text"
      value={strMsServants}
      onChange={handleChange}
      onFocus={selectOnFocus}
    />
  )
}
