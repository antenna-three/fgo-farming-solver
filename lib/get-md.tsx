import fs from 'fs'
import path from 'path'


export function getMd(file: string) {
    console.log(process.cwd(), file)
    const fullPath = path.join(process.cwd(), file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return fileContents
}