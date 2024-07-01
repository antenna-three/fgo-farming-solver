import { fetchJson } from './fetch-json'

export const getQuestTranslation = async (): Promise<{
  [jpQuestName: string]: string
}> => {
  const key = process.env.GOOGLE_SHEETS_API_KEY ?? ''
  const spreadsheetId = '1NY7nOVQkDyWTXhnK1KP1oPUXoN1C0SY6pMEXPcFuKyI'
  const range = "'JP Droprate Table'!D:E"
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${key}`
  const response = await fetchJson<{ values: [string, string][] }>(url)
  return Object.fromEntries(
    response.values
      .filter((row) => row.length == 2)
      .slice(1)
      .map(([enName, jpName]) => [jpName, enName])
  )
}
