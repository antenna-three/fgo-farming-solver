import { promises as fs, createWriteStream } from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import { readJson } from './read-json'
import { getHash } from './get-hash'

const fetchAndWriteJson = async (
  url: string,
  hash: string,
  hashPath: string,
  cachePath: string
) => {
  const res = await fetch(url)
  await fs
    .mkdir(path.dirname(hashPath), { recursive: true })
    .catch((e) => console.error(e))
  fs.writeFile(hashPath, hash, 'utf-8').catch((e) => console.error(e))
  const cacheFile = createWriteStream(cachePath, 'utf-8')
  res.body?.pipe(cacheFile).once('error', (e) => console.error(e))
  return res.json() as any
}

export const fetchJsonWithCache = async (url: string) => {
  if (process.env.NODE_ENV == 'production' && process.env.CI != '1')
    return fetch(url).then((res) => res.json())
  const cacheDir = path.resolve('.next/cache/atlasacademy')
  const stem = path.basename(url, '.json')
  const hashPath = path.resolve(cacheDir, `${stem}.hash.txt`)
  const cachePath = path.resolve(cacheDir, `${stem}.json`)
  const hash = await getHash()
  const obj = fs
    .readFile(hashPath, 'utf-8')
    .then((localHash) =>
      localHash == hash
        ? readJson(cachePath)
        : fetchAndWriteJson(url, hash, hashPath, cachePath)
    )
    .catch(async () => fetchAndWriteJson(url, hash, hashPath, cachePath))
  return obj
}
