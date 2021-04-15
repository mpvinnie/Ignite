import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO'
import Rental from '@modules/rentals/infra/typeorm/entities/Rental'
import { v4 as uuid } from 'uuid'

import IRentalsRepository from '../IRentalsRepository'

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = []

  async create({
    user_id,
    car_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, {
      id: uuid(),
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date()
    })

    this.rentals.push(rental)

    return rental
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.id === id)
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.user_id === user_id)
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_date
    )
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_date
    )
  }

  async save(rental: Rental): Promise<Rental> {
    const findIndex = this.rentals.findIndex(
      findRental => findRental.id === rental.id
    )

    this.rentals[findIndex] = rental

    return this.rentals[findIndex]
  }
}

export default RentalsRepositoryInMemory
