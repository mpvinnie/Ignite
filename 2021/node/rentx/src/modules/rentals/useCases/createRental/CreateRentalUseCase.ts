import IUsersRepository from '@modules/accounts/repositories/IUsersRepository'
import ICarsRepository from '@modules/cars/repositories/ICarsRepository'
import Rental from '@modules/rentals/infra/typeorm/entities/Rental'
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { inject, injectable } from 'tsyringe'

import IDateProvider from '@shared/containers/providers/DateProvider/models/IDateProvider'
import AppError from '@shared/errors/AppError'

dayjs.extend(utc)

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    const minHour = 24

    const findUser = await this.usersRepository.findById(user_id)

    if (!findUser) {
      throw new AppError('User does not exists')
    }

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
      car_id
    )

    if (carUnavailable) {
      throw new AppError('Car is unavailable')
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUserId(
      user_id
    )

    if (rentalOpenToUser) {
      throw new AppError('There is a rental in progress for user')
    }

    const dateNow = this.dateProvider.dateNow()

    const compare = this.dateProvider.compareInHours({
      start_date: dateNow,
      end_date: expected_return_date
    })

    if (compare < minHour) {
      throw new AppError('Invalid return time')
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    await this.carsRepository.updateAvailability(car_id, false)

    return rental
  }
}

export default CreateRentalUseCase
