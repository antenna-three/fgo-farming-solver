import { origin, region } from '../constants/atlasacademy'

export const getHash = async (): Promise<string> =>
  fetch(`${origin}/info`)
    .then((res) => res.json())
    .then((info) => info[region].hash)
