import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO'
import ICarsRepository from '@modules/cars/repositories/ICarsRepository'
import { getRepository, Repository } from 'typeorm'

import Car from '../entities/Car'

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })

    await this.repository.save(car)

    return car
  }

  async findById(id: string): Promise<Car> {
    return await this.repository.findOne(id)
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ license_plate })
  }

  async findAvailable(
    category_id?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('car')
      .where('available = :available', { available: true })
      .leftJoinAndSelect('car.specifications', 'specification')
      .leftJoinAndSelect('car.images', 'image')

    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id })
    }

    if (name) {
      carsQuery.andWhere('name = :name', { name })
    }

    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand })
    }

    const cars = await carsQuery.getMany()

    return cars
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder('car')
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id })
      .execute()
  }

  async save(car: Car): Promise<Car> {
    return await this.repository.save(car)
  }
}

export default CarsRepository
