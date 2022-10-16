import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import RentalsRepositoryInMemory from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import dayjs from 'dayjs'

import DayjsDateProvider from '@shared/containers/providers/DateProvider/implementations/DayjsDateProvider'
import AppError from '@shared/errors/AppError'

import CreateRentalUseCase from './CreateRentalUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider
let carsRepositoryInMemory: CarsRepositoryInMemory
let createRental: CreateRentalUseCase

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createRental = new CreateRentalUseCase(
      usersRepositoryInMemory,
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    )
  })

  it('should be able to create a rental', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      driver_license: '123456'
    })

    const car = await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      category_id: 'category_id',
      brand: 'brand'
    })

    const rental = await createRental.execute({
      user_id: user.id,
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a rental for a unavailable car', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      driver_license: '123456'
    })

    const user2 = await usersRepositoryInMemory.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
      driver_license: '654321'
    })

    const car = await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      category_id: 'category_id',
      brand: 'brand'
    })

    await createRental.execute({
      user_id: user.id,
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    })

    await expect(
      createRental.execute({
        user_id: user2.id,
        car_id: car.id,
        expected_return_date: dayAdd24Hours
      })
    ).rejects.toEqual(new AppError('Car is unavailable'))
  })

  it('should not be able to create a rental if user already rent a car', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      driver_license: '123456'
    })

    const car1 = await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      category_id: 'category_id',
      brand: 'brand'
    })

    const car2 = await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1212',
      fine_amount: 40,
      category_id: 'category_id',
      brand: 'brand'
    })

    await createRental.execute({
      user_id: user.id,
      car_id: car1.id,
      expected_return_date: dayAdd24Hours
    })

    await expect(
      createRental.execute({
        user_id: user.id,
        car_id: car2.id,
        expected_return_date: dayAdd24Hours
      })
    ).rejects.toEqual(new AppError('There is a rental in progress for user'))
  })

  it('should not be able to create a rental with expected return date less than 24 hours', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      driver_license: '123456'
    })

    await expect(
      createRental.execute({
        user_id: user.id,
        car_id: 'car_id',
        expected_return_date: dayjs().toDate()
      })
    ).rejects.toEqual(new AppError('Invalid return time'))
  })
})
