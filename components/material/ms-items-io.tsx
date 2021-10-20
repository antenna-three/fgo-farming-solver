import { ChangeEventHandler, Dispatch, SetStateAction, useMemo } from 'react'
import { useSelectOnFocus } from '../../hooks/use-select-on-focus'
import { Item } from '../../interfaces/atlas-academy'
import { useMsItemId } from '../../hooks/use-ms-item-id'
import { Input } from '@chakra-ui/input'

export const MsItemsIo = ({
  items,
  posession,
  setPosession,
}: {
  items: Item[]
  posession: { [id: number]: number }
  setPosession: Dispatch<SetStateAction<{ [id: number]: number }>>
}) => {
  const { getItemId, getMsItemId } = useMsItemId(items)
  const msItems = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(posession)
          .filter(([id]) => getMsItemId(id) != null)
          .map(([id, amount]) => [getMsItemId(id), amount])
      ),
    [getMsItemId, posession]
  )
  const strMsItems = Object.values(msItems).every((value) => value == 0)
    ? ''
    : JSON.stringify(msItems)
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const { value } = event.currentTarget
    if (!value) {
      setPosession((posession) =>
        Object.fromEntries(
          Object.entries(posession).map(([id, amount]) => [id, 0])
        )
      )
      return
    }
    let msItems: { [key: string]: number } = {}
    try {
      msItems = JSON.parse(value)
    } catch (e) {
      if (e instanceof SyntaxError) {
        return
      } else {
        console.log(e)
      }
    }
    if (!Object.values(msItems).every((value) => typeof value == 'number')) {
      return
    }
    setPosession(
      Object.fromEntries(
        Object.entries(msItems).map(([msId, amount]) => [
          getItemId(msId),
          amount,
        ])
      )
    )
  }
  const selectOnFocus = useSelectOnFocus()
  return (
    <Input
      type="text"
      value={strMsItems}
      onChange={handleChange}
      onFocus={selectOnFocus}
    />
  )
}
