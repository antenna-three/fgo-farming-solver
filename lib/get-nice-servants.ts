import { origin, region } from '../constants/atlasacademy'
import { NiceServant } from '../interfaces'
import { fetchJsonWithCache } from './cache'
import { getHash } from './get-hash'

export const getNiceServants = async () => {
  const url = `${origin}/export/${region}/nice_servant.json`
  const hash = await getHash()
  const servants: NiceServant[] = await fetchJsonWithCache(url, hash)
  return servants
}
