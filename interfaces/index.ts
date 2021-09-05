export type ClassName =
| 'saber'
| 'archer'
| 'lanver'
| 'rider'
| 'caster'
| 'assassin'
| 'berserker'
| 'shielder'
| 'ruler'
| 'avenger'
| 'alterEgo'
| 'moonCancer'
| 'foreigner'
| 'pretender'

export type Servant = {
    id: number,
    collectionNo: number,
    name: string,
    type: string,
    flag: string,
    className: ClassName,
    attribute: string,
    rarity: number,
    [key: string]: any;
}

export type Materials = {
    [key: string]: {
        items: {
            item: Item,
            amount: number,
        }[],
        qp: number,
    }
}

export type Item = {
    id: number,
    name: string,
    type: string,
    uses: 'skill' | 'ascension' | 'costume',
    detail: string,
    icon: string,
    background: 'zero' | 'bronze' | 'silver' | 'gold' | 'questClearQPReward',
    priority: number,
    dropPriority: number,
}
