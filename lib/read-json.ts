import fs from 'fs/promises'

export const readJson = async <T>(path: string) =>
  fs.readFile(path, 'utf-8').then((file) => JSON.parse(file) as T)
