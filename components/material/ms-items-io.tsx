import { ChangeEventHandler, Dispatch, SetStateAction, useMemo } from 'react'
import { selectOnFocus } from '../../lib/select-on-focus'
import { Item } from '../../interfaces/atlas-academy'
import { getMsItemIdConverter } from '../../lib/get-ms-item-id-converter'
import { Input } from '@chakra-ui/input'

export const MsItemsIo = ({
  items,
  posession,
  setPosession,
}: {
  items: Item[]
  posession: { [id: string]: number }
  setPosession: Dispatch<SetStateAction<{ [id: string]: number }>>
}) => {
  const { getItemId, getMsItemId } = useMemo(
    () => getMsItemIdConverter(items),
    [items]
  )
  const msItems = Object.fromEntries(
    Object.entries(posession)
      .filter(([id, amount]) => getMsItemId(id) != null)
      .map(([id, amount]) => [getMsItemId(id), amount])
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
  return (
    <Input
      type="text"
      value={strMsItems}
      onChange={handleChange}
      onFocus={selectOnFocus}
    />
  )
}
