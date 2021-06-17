import S3 from 'aws-sdk/clients/s3'

export async function getItemList() {
    const bucket = 'fgodrop'
    const key = 'items.csv'

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
            const rows = table.slice(1)
            const categoryIndex = header.indexOf('カテゴリ')
            const itemIndex = header.indexOf('アイテム')
            const items = rows.map(
                row => ({category: row[categoryIndex], item: row[itemIndex]})
            )
            return items
        }
    } catch (e) {
        console.log(e, e.stack)
        return []
    }
}