export type Item = { id: string; category: string; name: string }
export type Quest = {
  [key in `samples_${DropRateKey}`]: number
} & {
  id: string
  section: string
  area: string
  name: string
  ap: number
}
export type DropRateKey = '1' | '2'
export type DropRate = {
  [key in `drop_rate_${DropRateKey}`]: number
} & {
  item_id: string
  quest_id: string
}
