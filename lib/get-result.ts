import { Result } from '../interfaces/api'
import { getDynamoDb } from './dynamodb'

export const getResult = async (id: string) =>
  getDynamoDb({
    region: 'ap-northeast-1',
    tableName: 'fgo-farming-solver-results',
    key: { id },
  }) as Promise<Result>
