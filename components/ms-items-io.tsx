import { ChangeEventHandler, Dispatch, SetStateAction, useMemo } from "react";
import { selectOnFocus } from "../handlers/select-on-focus";
import { Item } from "../interfaces";
import { getMsItemIdConverter } from "../lib/get-ms-item-id-converter";


const MsItemsIo = ({
    items,
    posession,
    setPosession,
}: {
    items: Item[],
    posession: { [id: string]: number },
    setPosession: Dispatch<SetStateAction<{ [id: string]: number }>>,
}) => {
    const { getItemId, getMsItemId } = useMemo(() => getMsItemIdConverter(items), [items])
    const msItems = Object.fromEntries(Object.entries(posession)
        .filter(([id, amount]) => (getMsItemId(id) != null))
        .map(([id, amount]) => ([getMsItemId(id), amount])))
    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        const { value } = event.currentTarget
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
        if (!Object.values(msItems).every(value => typeof (value) == 'number')) {
            return
        }
        setPosession(Object.fromEntries(Object.entries(msItems).map(([msId, amount]) => ([getItemId(msId), amount]))))
    }
    return (
        <input type="text" value={JSON.stringify(msItems)} onChange={handleChange} onFocus={selectOnFocus} />
    )
}
export default MsItemsIo