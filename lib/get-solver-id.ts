import { Item } from "../interfaces"

export const getSolverId = (item: Item) => {
    if (100 <= item.priority && item.priority < 107) {
        //輝石
        return '3' + (item.priority - 100).toString(36)
    } else if (107 <= item.priority && item.priority < 114) {
        //魔石
        return '4' + (item.priority - 107).toString(36)
    } else if (114 <= item.priority && item.priority < 121) {
        //秘石
        return '5' + (item.priority - 114).toString(36)
    } else if (200 <= item.priority && item.priority < 210) {
        //銅素材
        return '0' + (item.priority - 200).toString()
    } else if (210 <= item.priority && item.priority < 220) {
        //銀素材
        return '1' + (item.priority - 210).toString(36)
    } else if (220 <= item.priority && item.priority < 232) {
        return '1' + (item.priority - 211).toString(36)
    } else if (232 <= item.priority && item.priority < 299) {
        //金素材
        return '2' + (item.priority - 232).toString(36)
    } else if (300 <= item.priority && item.priority < 307) {
        //ピース
        return '6' + (item.priority - 300).toString(36)
    } else if (307 <= item.priority && item.priority < 314) {
        //モニュメント
        return '7' + (item.priority - 307).toString(36)
    }
}