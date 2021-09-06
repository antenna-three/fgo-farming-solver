import { Servant } from "../interfaces"


const handleMechaElichanII = (collectionNo: number) => (
    collectionNo == 191 ? 215.5 : collectionNo
)

export const getMsServantIdConverter = (servants: Servant[]) => {
    const servants_ = [...servants]
    const msIds = servants_
        .sort((a, b) => (handleMechaElichanII(a.collectionNo) - handleMechaElichanII(b.collectionNo)))
        .map(({id}, index) => ({ id, msId: index + 1 }))
    const getMsId = (id: number) => msIds.find(pair => pair.id == id)?.msId || 0
    const getId = (msId: number) => msIds.find(pair => pair.msId == msId)?.id || 0
    return {getMsId, getId}
}
