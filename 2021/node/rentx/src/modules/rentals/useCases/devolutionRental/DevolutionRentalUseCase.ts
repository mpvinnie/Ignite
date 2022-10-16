import ICarsRepository from '@modules/cars/repositories/ICarsRepository'
import Rental from '@modules/rentals/infra/typeorm/entities/Rental'
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository'
import { inject, injectable } from 'tsyringe'

import IDateProvider from '@shared/containers/providers/DateProvider/models/IDateProvider'
import AppError from '@shared/errors/AppError'

interface IRequest {
  id: string
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(rental.car_id)
    const minumum_daily = 1

    if (!rental) {
      throw new AppError('Rental does not exists')
    }

    const dateNow = this.dateProvider.dateNow()

    let daily_days = this.dateProvider.compareInDays({
      start_date: rental.start_date,
      end_date: dateNow
    })

    if (daily_days <= 0) {
      daily_days = minumum_daily
    }

    const delay_days = this.dateProvider.compareInDays({
      start_date: dateNow,
      end_date: rental.expected_return_date
    })

    let total = 0

    if (delay_days > 0) {
      const calculate_fine = daily_days * car.fine_amount
      total = calculate_fine
    }

    total += daily_days * car.daily_rate

    rental.end_date = dateNow
    rental.total = total

    await this.rentalsRepository.save(rental)
    await this.carsRepository.updateAvailability(car.id, true)

    return rental
  }
}

export default DevolutionRentalUseCase
