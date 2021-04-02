import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UploadCarImagesUseCase from './UploadCarImagesUseCase'

export default class UploadCarImageController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const images = request.files as Express.Multer.File[]

    const images_name = images.map(file => file.filename)

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase)

    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name
    })

    return response.status(201).send()
  }
}
