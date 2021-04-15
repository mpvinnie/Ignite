import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO'
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository'
import { getRepository, Repository } from 'typeorm'

import Rental from '../entities/Rental'

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async create({
    user_id,
    car_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date
    })

    await this.repository.save(rental)

    return rental
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne(id)
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    })
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    })
  }

  async save(rental: Rental): Promise<Rental> {
    return await this.repository.save(rental)
  }
}

export default RentalsRepository
