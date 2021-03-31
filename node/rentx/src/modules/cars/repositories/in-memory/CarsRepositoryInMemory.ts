import ICreteCarDTO from '@modules/cars/dtos/ICreteCarDTO'
import Car from '@modules/cars/infra/typeorm/entities/Car'

import ICarsRepository from '../ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  public async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate)
  }

  public async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: ICreteCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })

    this.cars.push(car)

    return car
  }
}

export default CarsRepositoryInMemory
