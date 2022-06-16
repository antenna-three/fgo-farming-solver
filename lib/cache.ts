import { promises as fs } from 'fs'
import got, { OptionsOfJSONResponseBody, OptionsOfTextResponseBody } from 'got'
import path from 'path'
import { getHash } from './get-hash'
import { readJson } from './read-json'

const option: OptionsOfTextResponseBody & OptionsOfJSONResponseBody = {
  timeout: { request: 60000 },
  retry: { limit: 10 },
}

const fetchAndWriteJson = async <T>(
  url: string,
  hash: string,
  hashPath: string,
  cachePath: string
) => {
  console.log(`fetching ${url}`)
  const res = await got(url, option)
  await fs
    .mkdir(path.dirname(hashPath), { recursive: true })
    .catch((e) => console.error(e))
  fs.writeFile(hashPath, hash, 'utf-8').catch((e) => console.error(e))
  fs.writeFile(cachePath, res.body, 'utf-8').catch((e) => console.error(e))
  return JSON.parse(res.body) as T
}

export const fetchJsonWithCache = async <T>(url: string) => {
  if (process.env.NODE_ENV == 'production' && process.env.CI != '1')
    return got(url, option).json<T>()
  const cacheDir = path.resolve('.next/cache/atlasacademy')
  const stem = path.basename(url, '.json')
  const hashPath = path.resolve(cacheDir, `${stem}.hash.txt`)
  const cachePath = path.resolve(cacheDir, `${stem}.json`)
  const hash = await getHash()
  const obj = fs
    .readFile(hashPath, 'utf-8')
    .then((localHash) =>
      localHash == hash
        ? readJson<T>(cachePath)
        : fetchAndWriteJson<T>(url, hash, hashPath, cachePath)
    )
    .catch(async () => fetchAndWriteJson<T>(url, hash, hashPath, cachePath))
  return obj
}
