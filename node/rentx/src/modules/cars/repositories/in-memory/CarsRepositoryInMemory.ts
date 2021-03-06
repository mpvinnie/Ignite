import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO'
import Car from '@modules/cars/infra/typeorm/entities/Car'
import { v4 as uuid } from 'uuid'

import ICarsRepository from '../ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = []

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      id: uuid(),
      name,
      description,
      daily_rate,
      available: true,
      license_plate,
      fine_amount,
      brand,
      category_id,
      created_at: new Date()
    })

    this.cars.push(car)

    return car
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id)
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate)
  }

  async findAvailable(
    category_id?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]> {
    let cars = this.cars.filter(car => car.available)

    if (category_id) {
      cars = cars.filter(car => car.category_id === category_id)
    }

    if (name) {
      cars = cars.filter(car => car.name === name)
    }
    if (brand) {
      cars = cars.filter(car => car.brand === brand)
    }

    return cars
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex(car => car.id === id)
    this.cars[findIndex].available = available
  }

  async save(car: Car): Promise<Car> {
    const findIndex = this.cars.findIndex(findIndex => findIndex.id === car.id)

    this.cars[findIndex] = car

    return this.cars[findIndex]
  }
}

export default CarsRepositoryInMemory
