import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

import AppError from '@shared/errors/AppError'

import CreateCarUseCase from './CreateCarUseCase'

let carsRepositoryInMemory: CarsRepositoryInMemory
let createCarUseCase: CreateCarUseCase

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to craete a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category_id'
    })

    expect(car).toHaveProperty('id')
  })

  it('should not be able to craete a car with existent license plate', async () => {
    await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category_id'
    })

    await expect(
      createCarUseCase.execute({
        name: 'Name Car',
        description: 'Description Car',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'Category_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to craete a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category_id'
    })

    expect(car.available).toBe(true)
  })
})
