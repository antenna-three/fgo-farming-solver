import S3 from 'aws-sdk/clients/s3'
import _ from 'underscore'

export async function getS3(key: string) {
    const bucket = 'fgodrop'

    const s3 = new S3()

    try {
        const data = await s3.getObject({ Bucket: bucket, Key: key }).promise()
        const body = data.Body?.toString()
        if (body == null) {
            return []
        } else {
            const lines = body.split(/\r\n/).filter(line => (line != ''))
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
        }
    } catch (e) {
        console.log(e, e.stack)
        return []
    }
}