import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import { Readable, PassThrough } from 'stream'
import { createGunzip, createGzip } from 'zlib'

export const getGzip = async (region: string, bucket: string, key: string) => {
  const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY
  if (accessKeyId == null || secretAccessKey == null) {
    console.log('Environment variables are not set')
    return {}
  }

  const client = new S3Client({
    credentials: { accessKeyId, secretAccessKey },
    region,
  })
  const command = new GetObjectCommand({ Bucket: bucket, Key: key })

  try {
    const response = await client.send(command)
    const src = response.Body as Readable

    if (src == null) {
      console.error('Response body is empty')
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
    if (e instanceof Error) {
      console.error(e, e.stack)
    }
    return {}
  }
}

export const putGzip = async (
  region: string,
  bucket: string,
  key: string,
  body: string
) => {
  const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY
  if (accessKeyId == null || secretAccessKey == null) {
    console.error('Environment variables are not set')
    return
  }

  const gzip = createGzip()
  const dst = new PassThrough()
  Readable.from(body).pipe(gzip).pipe(dst)

  const client = new S3Client({
    credentials: { accessKeyId, secretAccessKey },
    region,
  })
  const command = new PutObjectCommand({ Bucket: bucket, Key: key, Body: dst })

  try {
    await client.send(command)
  } catch (e) {
    if (e instanceof Error) {
      console.error(e, e.stack)
    }
    return
  }
}
