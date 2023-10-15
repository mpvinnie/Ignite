import fs from 'node:fs'
import path from 'node:path'

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
    const transformedFileName = transformUploadFileName(fileName)

    const filePath = path.resolve(uploadsFolder, transformedFileName)

    fs.promises.writeFile(filePath, body)

    return { url: transformedFileName }
  }
}
