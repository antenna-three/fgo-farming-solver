import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import _ from 'underscore'
import { Readable, PassThrough } from 'stream'
import { createGunzip } from 'zlib'

export async function getS3(key: string): Promise<{[key: string]: string}[]> {
    const bucket = 'fgodrop'

    const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID
    const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY
    if (accessKeyId == null || secretAccessKey == null) {
        console.log('Environment variables are not set')
        return []
    }

    const client = new S3Client({ credentials: { accessKeyId, secretAccessKey }, region: 'ap-northeast-1' })
    const command = new GetObjectCommand({ Bucket: bucket, Key: key })

    try {
        const response = await client.send(command)
        const body = response.Body as Readable
        let data: string = ''
        for await (const chunk of body) {
            data += chunk
        }

        if (body == null) {
            console.log('Response body is empty')
            return []
        }
        const lines = data.split(/\r\n/).filter(line => (line != ''))
        const table = lines.map(line => line.split(','))
        const header = table[0]
        const en_header = header.map(h => {
            switch (h) {
                case 'アイテム':
                    return 'item' 
                case 'カテゴリ':
                    return 'category'
                case 'エリア':
                    return 'area'
                case 'クエスト名':
                    return 'quest'
                case 'ドロップ率':
                    return 'dropRate'
                default:
                    return h
            }
        })
        const rows = table.slice(1)
        const obj = rows.map(
            row => (Object.fromEntries(_.zip(en_header, row)))
        )
        return obj
    } catch (e) {
        console.log(e, e.stack)
        return []
    }
}

export async function getJSON(key: string): Promise<{[key: string]: {[key: string]: string}[]}> {
    const bucket = 'fgodrop'

    const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID
    const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY
    if (accessKeyId == null || secretAccessKey == null) {
        console.log('Environment variables are not set')
        return {}
    }

    const client = new S3Client({ credentials: { accessKeyId, secretAccessKey }, region: 'ap-northeast-1' })
    const command = new GetObjectCommand({ Bucket: bucket, Key: key })

    try {
        const response = await client.send(command)
        const body = response.Body as Readable

        if (body == null) {
            console.log('Response body is empty')
            return {}
        }
        
        let data: string = ''
        for await (const chunk of body) {
            data += chunk
        }
        
        return JSON.parse(data)
    } catch (e) {
        console.log(e, e.stack)
        return {}
    }
}


export async function getGzip(key: string): Promise<{[key: string]: {[key: string]: string | number}[]}> {
    const bucket = 'fgodrop'

    const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID
    const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY
    if (accessKeyId == null || secretAccessKey == null) {
        console.log('Environment variables are not set')
        return {}
    }

    const client = new S3Client({ credentials: { accessKeyId, secretAccessKey }, region: 'ap-northeast-1' })
    const command = new GetObjectCommand({ Bucket: bucket, Key: key })

    try {
        const response = await client.send(command)
        const src = response.Body as Readable

        if (src == null) {
            console.log('Response body is empty')
            return {}
        }

        const gunzip = createGunzip()
        const dst = new PassThrough()
        src.pipe(gunzip).pipe(dst)
        
        let data: string = ''
        for await (const chunk of dst) {
            data += chunk
        }
        
        return JSON.parse(data)
    } catch (e) {
        console.log(e, e.stack)
        return {}
    }
    return {}
}