import { origin, region } from "../constants/atlasacademy"
import { Servant } from "../interfaces"

export const getServants = async () => {
    const enumUrl = `${origin}/export/${region}/nice_enums.json`
    const classNames: string[] = await fetch(enumUrl).then(res => res.json()).then(obj => Object.values(obj.SvtClass))
    const servantsUrl = `${origin}/export/${region}/basic_servant.json`
    const servants = fetch(servantsUrl)
        .then(res => res.json())
        .then((servants: Servant[]) => servants.filter(({ type }) => (type == 'normal' || type == 'heroine')))
        .then(servants => servants.sort((a, b) => ((classNames.indexOf(a.className) - classNames.indexOf(b.className)) * 10 + b.rarity - a.rarity)))
    return servants
}