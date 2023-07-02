import { Input } from '@chakra-ui/input'
import { ChangeEventHandler, Dispatch, SetStateAction, useMemo } from 'react'
import { useMsItemId } from '../../hooks/use-ms-item-id'
import { useSelectOnFocus } from '../../hooks/use-select-on-focus'
import { Item } from '../../interfaces/atlas-academy'

export const MsItemsIo = ({
  items,
  posession,
  setPosession,
}: {
  items: Item[]
  posession: Record<number, number>
  setPosession: Dispatch<SetStateAction<Record<number, number>>>
}) => {
  const { getItemId, getMsItemId } = useMsItemId(items)
  const msItems = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(posession)
          .map(([id, amount]) => [getMsItemId(parseInt(id)), amount])
          .filter((pair): pair is [number, number] => pair[0] != null)
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
        Object.fromEntries(Object.entries(posession).map(([id]) => [id, 0]))
      )
      return
    }
    let msItems: Record<string, number> = {}
    try {
      msItems = JSON.parse(value) as Record<string, number>
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
        Object.entries(msItems)
          .map(([msId, amount]) => [getItemId(parseInt(msId)), amount])
          .filter((pair): pair is [number, number] => pair[0] != null)
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
