import { origin, region } from '../constants/atlasacademy'
import { fetchJson } from './fetch-json'

export async function getHash(): Promise<string> {
  const info = await fetchJson<Record<string, { hash: string }>>(`${origin}/info`)
  return info[region].hash
}
