import { promises as fs, createWriteStream } from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import { readJson } from './read-json'

const fetchAndWriteJson = async (
  url: string,
  hash: string,
  hashPath: string,
  cachePath: string
) => {
  const res = await fetch(url)
  try {
    await fs.mkdir(path.dirname(hashPath), { recursive: true })
    fs.writeFile(hashPath, hash, 'utf-8')
    const cacheFile = createWriteStream(cachePath, 'utf-8')
    res.body.pipe(cacheFile)
  } catch (e) {
    console.error(e)
  }
  return res.json()
}

export const fetchJsonWithCache = async (url: string, hash: string) => {
  const cacheDir = path.resolve('cache')
  const stem = path.basename(url, '.json')
  const hashPath = path.resolve(cacheDir, `${stem}.hash.txt`)
  const cachePath = path.resolve(cacheDir, `${stem}.json`)
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
