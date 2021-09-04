import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

export async function getDynamoDb({
    tableName,
    key,
}: {
    tableName: string,
    key: object,
}) {
    const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID
    const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY
    if (accessKeyId == null || secretAccessKey == null) {
        throw 'Environment variables MY_AWS_ACCESS_KEY_ID, MY_AWS_SECRET_ACESS_KEY are not set'
    }

    const command = new GetItemCommand({ TableName: tableName, Key: marshall(key) })
    const client = new DynamoDBClient({
        credentials: { accessKeyId, secretAccessKey },
        region: 'ap-northeast-1'
    })
    const { Item } = await client.send(command)
    if (Item == null) {
        throw new DBError(`DB returned null for key ${key}`)
    }
    return unmarshall(Item)
}

export async function putDynamoDb({
    tableName,
    item,
}: {
    tableName: string,
    item: object
}) {
    const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID
    const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY
    if (accessKeyId == null || secretAccessKey == null) {
        throw 'Environment variables MY_AWS_ACCESS_KEY_ID, MY_AWS_SECRET_ACESS_KEY are not set'
    }
    const command = new PutItemCommand({ TableName: tableName, Item: marshall(item) })
    const client = new DynamoDBClient({
        credentials: { accessKeyId, secretAccessKey },
        region: 'ap-northeast-1'
    })
    client.send(command)
}

export class DBError extends Error {
    constructor(message: string) {
        super(message)
    }
}