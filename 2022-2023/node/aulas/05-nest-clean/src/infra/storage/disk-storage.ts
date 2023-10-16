import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

import {
  UploadParams,
  Uploader
} from '@/domain/forum/application/storage/uploader'
import { transformUploadFileName } from '@/utils/transform-upload-filename'
import { Injectable } from '@nestjs/common'
import { EnvService } from '../env/env.service'

const uploadsFolder = path.resolve(__dirname, '..', '..', '..', 'uploads')
const testsUploadsFolder = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'test',
  'uploads'
)

@Injectable()
export class DiskStorage implements Uploader {
  constructor(private envService: EnvService) {}

  async upload({ fileName, body }: UploadParams): Promise<{ url: string }> {
    const uploadId = randomUUID()

    const transformedFileName = transformUploadFileName(fileName)

    const uniqueFileName = `${uploadId}-${transformedFileName}`

    console.log(this.envService.get('ENV'))

    const uploadFolder =
      this.envService.get('ENV') === 'test' ? testsUploadsFolder : uploadsFolder

    const filePath = path.resolve(uploadFolder, uniqueFileName)

    fs.promises.writeFile(filePath, body)

    return { url: uniqueFileName }
  }
}
