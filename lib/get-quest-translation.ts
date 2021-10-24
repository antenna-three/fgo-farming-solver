import fs from 'fs/promises'
import path from 'path'
import fetch from 'node-fetch'

export const getQuestTranslation = async (): Promise<{
  [jpQuestName: string]: string
}> => {
  const cacheDir = path.resolve('cache')
  const cachePath = path.resolve(cacheDir, 'quests.json')
  return fs
    .readFile(cachePath, 'utf-8')
    .then((value) => JSON.parse(value))
    .catch(async () => {
      const key = process.env.GOOGLE_SHEETS_API_KEY
      const spreadsheetId = '1NY7nOVQkDyWTXhnK1KP1oPUXoN1C0SY6pMEXPcFuKyI'
      const range = "'JP Droprate Table'!D:E"
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${key}`
      const res = (await fetch(url).then((res) => res.json())) as {
        values: [string, string][]
      }
      const map = Object.fromEntries(
        res.values
          .filter((row) => row.length == 2)
          .slice(1)
          .map(([enName, jpName]) => [jpName, enName])
      )
      fs.mkdir(cacheDir)
        .then(() => fs.writeFile(cachePath, JSON.stringify(map), 'utf-8'))
        .catch((e) => console.error(e))
      return map
    })
}
