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

export type TargetKey = 'ascension' | 'skill' | 'appendSkill'
export type MaterialsKey = `${TargetKey}Materials`

export type Servant = {
  id: number
  collectionNo: number
  name: string
  type: string
  flag: string
  className: ClassName
  attribute: string
  rarity: number
}

export type MaterialsRecord = Record<MaterialsKey, Materials>

export type NiceServant = Servant & MaterialsRecord

export type Materials = {
  [key: string]: {
    items: {
      item: Item
      amount: number
    }[]
    qp: number
  }
}

export type Item = {
  id: number
  name: string
  type: string
  uses: 'skill' | 'ascension' | 'costume'
  detail: string
  icon: string
  background: 'zero' | 'bronze' | 'silver' | 'gold' | 'questClearQPReward'
  priority: number
  dropPriority: number
}

export type War = {
  id: number
  coordinates: [[number, number], [number, number]]
  age: string
  name: string
  longName: string
  eventId: number
  eventName: string
}
