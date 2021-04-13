import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UploadCarImageUseCase from './UploadCarImageUseCase'

export default class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const images = request.files as Express.Multer.File[]

    const uploadCarImages = container.resolve(UploadCarImageUseCase)

    const images_name = images.map(file => file.filename)

    await uploadCarImages.execute({
      car_id: id,
      images_name
    })

    return response.status(201).send()
  }
}
