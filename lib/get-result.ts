import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

export async function getResult(id: string) {
    const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID
    const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY
    if (accessKeyId == null || secretAccessKey == null) {
        throw 'Environment variables MY_AWS_ACCESS_KEY_ID, MY_AWS_SECRET_ACESS_KEY are not set'
    }

    const command = new GetItemCommand({ TableName: 'fgo-farming-solver-results', Key: {id: {S: id}} })
    const client = new DynamoDBClient({ credentials: { accessKeyId, secretAccessKey }, region: 'ap-northeast-1' })
    const { Item } = await client.send(command)
    if (Item == null) {
        throw new DBError(`DB returned null for id ${id}`)
    }
    return unmarshall(Item)
}

export class DBError extends Error {
    constructor(message: string) {
        super(message)
    }
}