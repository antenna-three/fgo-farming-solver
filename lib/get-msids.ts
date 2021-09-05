import { Servant } from "../interfaces"


const handleMechaElichanII = (collectionNo: number) => (
    collectionNo == 191 ? 215.5 : collectionNo
)

export const getMsIds = (servants: Servant[]) => {
    const servants_ = [...servants]
    const msIds = servants_
        .sort((a, b) => (handleMechaElichanII(a.collectionNo) - handleMechaElichanII(b.collectionNo)))
        .map(({id}, index) => ({ id, msId: index + 1 }))
    const getMsId = (id: number) => msIds.find(pair => pair.id == id)?.msId
    const getId = (msId: number) => msIds.find(pair => pair.msId == msId)?.id
    return {getMsId, getId}
}