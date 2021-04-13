import ICreateCarImageDTO from '@modules/cars/dtos/ICreateCarImageDTO'
import ICarImagesRepository from '@modules/cars/repositories/ICarImagesRepository'
import { getRepository, Repository } from 'typeorm'

import CarImage from '../entities/CarImage'

class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = getRepository(CarImage)
  }

  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name
    })

    await this.repository.save(carImage)

    return carImage
  }
}

export default CarImagesRepository
