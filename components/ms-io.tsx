import { Dispatch, SetStateAction } from "react";
import { Item, Servant } from "../interfaces";
import MsItemsIo from "./ms-items-io";
import MsServantsIo from "./ms-servants-io";
import { State } from "./servant-level-select";


const MsIo = ({
    servants,
    state,
    setState,
    items,
    posession,
    setPosession,
}: {
    servants: Servant[],
    state: State,
    setState: Dispatch<SetStateAction<State>>,
    items: Item[],
    posession: {[key: string]: number},
    setPosession: Dispatch<SetStateAction<{[key: string]: number}>>,
}) => {
    return (<>
        <label>
            サーヴァント
            <MsServantsIo servants={servants} state={state} setState={setState}/>
        </label>
        <label>
            アイテム
            <MsItemsIo items={items} posession={posession} setPosession={setPosession}/>
        </label>
    </>)
}
export default MsIo