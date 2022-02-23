import got from 'got'
import { origin, region } from '../constants/atlasacademy'

export const getHash = async (): Promise<string> =>
  got(`${origin}/info`)
    .json()
    .then(
      (info) => (info as { [region: string]: { hash: string } })[region].hash
    )
