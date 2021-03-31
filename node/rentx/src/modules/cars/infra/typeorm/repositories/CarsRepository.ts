import ICreteCarDTO from '@modules/cars/dtos/ICreteCarDTO'
import ICarsRepository from '@modules/cars/repositories/ICarsRepository'
import { getRepository, Repository } from 'typeorm'

import Car from '../entities/Car'

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  public async create({
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate
  }: ICreteCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate
    })

    await this.repository.save(car)

    return car
  }

  public async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate })

    return car
  }
}

export default CarsRepository
