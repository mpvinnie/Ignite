import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

import ListAvailableCarsUseCase from './ListAvailableCarsUseCase'

let carsRepositoryInMemory: CarsRepositoryInMemory
let listAvailableCars: ListAvailableCarsUseCase

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCars = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car brand',
      category_id: 'category_id'
    })

    const car2 = await carsRepositoryInMemory.create({
      name: 'Car Non-available',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car brand',
      category_id: 'category_id'
    })

    car2.available = false

    const cars = await listAvailableCars.execute({})

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car brand',
      category_id: 'category_id'
    })

    const car = await carsRepositoryInMemory.create({
      name: 'Car name 2',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car brand',
      category_id: 'category_id'
    })

    const cars = await listAvailableCars.execute({ name: 'Car name 2' })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car brand',
      category_id: 'category_id_test'
    })

    await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car brand',
      category_id: 'category_id'
    })

    const cars = await listAvailableCars.execute({
      category_id: 'category_id_test'
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
    await carsRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car brand',
      category_id: 'category_id'
    })

    const car = await carsRepositoryInMemory.create({
      name: 'Car name 2',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'car_brand_test',
      category_id: 'category_id'
    })

    const cars = await listAvailableCars.execute({ brand: 'car_brand_test' })

    expect(cars).toEqual([car])
  })
})
