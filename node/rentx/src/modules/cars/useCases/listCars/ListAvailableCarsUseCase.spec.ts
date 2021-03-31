import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

import ListAvailableCarsUseCase from './ListAvailableCarsUseCase'

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    )
  })

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'car-brand',
      category_id: 'category_id'
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('should be able to list all avilable cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'car-brand-test',
      category_id: 'category_id'
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'car-brand-test'
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all avilable cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car-test',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'car-brand',
      category_id: 'category_id'
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car-test'
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all avilable cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car-test',
      description: 'Car description',
      daily_rate: 110.0,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'car-brand',
      category_id: 'category_id'
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: 'category_id'
    })

    expect(cars).toEqual([car])
  })
})
