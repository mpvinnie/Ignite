import ICarImagesRepository from '@modules/cars/repositories/ICarImagesRepository'
import ICarsRepository from '@modules/cars/repositories/ICarsRepository'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const findCar = await this.carsRepository.findById(car_id)

    if (!findCar) {
      throw new AppError('Car not found')
    }

    images_name.map(async image => {
      await this.carImagesRepository.create({
        car_id,
        image_name: image
      })
    })
  }
}

export default UploadCarImageUseCase
