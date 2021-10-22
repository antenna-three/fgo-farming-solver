import { unmarshall } from '@aws-sdk/util-dynamodb'
import fs from 'fs/promises'
import path from 'path'
import { Result } from '../interfaces/api'
import { getDynamoDb } from './dynamodb'

export const getResult = async (id: string) =>
  (process.env.NODE_ENV == 'development'
    ? fs
        .readFile(path.resolve('mocks', 'result.json'), 'utf-8')
        .then((str) => JSON.parse(str))
        .then((obj) => unmarshall(obj))
    : getDynamoDb({
        region: 'ap-northeast-1',
        tableName: 'fgo-farming-solver-results',
        key: { id },
      })) as Promise<Result>
