import { origin, region } from "../constants/atlasacademy"
import { Item } from "../interfaces"

const getCategory = (item: Item) => {
    switch (Math.floor(item.priority / 100)) {
    case 0:
        return 'QP'
    case 1:
        switch (item.background) {
            case 'bronze':
                return '輝石'
            case 'silver':
                return '魔石'
            case 'gold':
                return '秘石'
        }
    case 2:
        switch (item.background) {
            case 'bronze':
                return '銅素材'
            case 'silver':
                return '銀素材'
            case 'gold':
                return '金素材'
        }
    case 3:
        switch (item.background) {
            case 'silver':
                return 'ピース'
            case 'gold':
                return 'モニュメント'
        }
    default:
        return '特殊霊基再臨素材'
    } 
}

export const getItems = async () => {
    const url = `${origin}/export/${region}/nice_item.json`
    const targetTypes = ['qp', 'skillLvUp', 'tdLvUp']
    return fetch(url).then(res => res.json()).then((items: Item[]) =>
        items.filter(item => (targetTypes.includes(item.type)))
            .map((item) => ({...item, category: getCategory(item)}))
            .sort((a, b) => (a.priority - b.priority))
    )
}