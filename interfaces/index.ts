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
}

export type Materials = {
    [key: string]: {
        items: {
            item: {
                id: number,
                name: string,
            },
            amount: number,
        }[],
        qp: number,
    }
}

