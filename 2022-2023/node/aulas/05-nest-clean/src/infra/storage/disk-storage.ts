import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

import {
  UploadParams,
  Uploader
} from '@/domain/forum/application/storage/uploader'
import { transformUploadFileName } from '@/utils/transform-upload-filename'
import { Injectable } from '@nestjs/common'

const uploadsFolder = path.resolve(__dirname, '..', '..', '..', 'uploads')

@Injectable()
export class DiskStorage implements Uploader {
  async upload({ fileName, body }: UploadParams): Promise<{ url: string }> {
    const uploadId = randomUUID()

    const transformedFileName = transformUploadFileName(fileName)

    const uniqueFileName = `${uploadId}-${transformedFileName}`

    const filePath = path.resolve(uploadsFolder, uniqueFileName)

    fs.promises.writeFile(filePath, body)

    return { url: uniqueFileName }
  }
}
