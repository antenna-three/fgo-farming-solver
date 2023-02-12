import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { gunzipSync, gzipSync } from 'zlib'
import { DBError, getDynamoDb, putDynamoDb } from '../../../lib/dynamodb'
import { options } from '../auth/[...nextauth]'

const region = 'ap-northeast-1'
const tableName = 'fgo-farming-solver-input'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, options)
  if (session == null) {
    res.status(401).send(null)
    return
  }
  const { id } = session.user
  const savedTime = Math.floor(Date.now() / 1000)

  if (req.method == 'POST') {
    if (typeof req.body != 'string') {
      throw new Error('Request body must be string.')
    }
    const item = { id, savedTime, input: gzipSync(req.body) }
    await putDynamoDb({ region, tableName, item })
    res.status(200).send(item)
  } else if (req.method == 'GET') {
    try {
      const item = await getDynamoDb({ region, tableName, key: { id } })
      res.status(200).send(gunzipSync(item.input as string))
    } catch (error) {
      if (error instanceof DBError) {
        res.status(404).send(null)
      } else {
        res.status(500).json({ error })
      }
    }
  }
}

export default handler
