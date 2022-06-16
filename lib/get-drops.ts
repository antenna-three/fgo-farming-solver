import path from 'path'
import { bucket, key, region } from '../constants/fgodrop'
import { DropRate, Item, Quest } from '../interfaces/fgodrop'
import { getGzip } from './get-s3'
import { readJson } from './read-json'

export type Drops = {
  items: Item[]
  quests: Quest[]
  drop_rates: DropRate[]
}

export const getDrops = async () =>
  (process.env.NODE_ENV == 'development'
    ? readJson(path.resolve('mocks', 'all.json'))
    : getGzip(region, bucket, key)) as Promise<Drops>
