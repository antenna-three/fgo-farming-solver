import { promises as fs, createWriteStream } from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const fetchAndWriteJson = async (
  url: string,
  hash: string,
  hashPath: string,
  cachePath: string
) => {
  const res = await fetch(url)
  fs.writeFile(hashPath, hash, 'utf-8')
  const cacheFile = createWriteStream(cachePath, 'utf-8')
  res.body.pipe(cacheFile)
  return res.json()
}

export const fetchJsonWithCache = async (url: string, hash: string) => {
  const cacheDir = path.resolve(process.cwd(), 'cache')
  await fs.mkdir(cacheDir).catch(() => {})
  const stem = path.basename(url, '.json')
  const hashPath = path.resolve(cacheDir, `${stem}.hash.txt`)
  const cachePath = path.resolve(cacheDir, `${stem}.json`)
  const obj = fs
    .readFile(hashPath, 'utf-8')
    .then((localHash) =>
      localHash == hash
        ? fs.readFile(cachePath, 'utf-8').then((json) => JSON.parse(json))
        : fetchAndWriteJson(url, hash, hashPath, cachePath)
    )
    .catch(async (err) => fetchAndWriteJson(url, hash, hashPath, cachePath))
  return obj
}
