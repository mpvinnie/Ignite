import CategoriesRepositoryInMemory from '@modules/cars/repositories/in-memory/CagetoriesRepositoryInMemory'
import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

import AppError from '@shared/errors/AppError'

import CraeteCarUseCase from './CreateCarUseCase'

let carsRepositoryInMemory: CarsRepositoryInMemory
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory
let createCar: CraeteCarUseCase

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCar = new CraeteCarUseCase(
      carsRepositoryInMemory,
      categoriesRepositoryInMemory
    )
  })

  it('should be able to create a car', async () => {
    const category = await categoriesRepositoryInMemory.create({
      name: 'Category name',
      description: 'Category Description'
    })

    const car = await createCar.execute({
      name: 'Car name',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Car Brand',
      category_id: category.id
    })

    expect(car).toHaveProperty('id')
  })

  it('should not be able to create a car with existent license plate', async () => {
    const category = await categoriesRepositoryInMemory.create({
      name: 'Category name',
      description: 'Category Description'
    })

    const car = await createCar.execute({
      name: 'Car name',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Car Brand',
      category_id: category.id
    })

    await expect(
      createCar.execute({
        name: 'Car name',
        description: 'Car Description',
        daily_rate: 100,
        license_plate: car.license_plate,
        fine_amount: 60,
        brand: 'Car Brand',
        category_id: category.id
      })
    ).rejects.toEqual(new AppError('Car already exists'))
  })

  it('should not be able to create a car with a non-existent category id', async () => {
    await expect(
      createCar.execute({
        name: 'Car name',
        description: 'Car Description',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Car Brand',
        category_id: 'non-existent-category-id'
      })
    ).rejects.toEqual(new AppError('Category does not exists'))
  })

  it('should be able to create an available car by default', async () => {
    const category = await categoriesRepositoryInMemory.create({
      name: 'Category name',
      description: 'Category Description'
    })

    const car = await createCar.execute({
      name: 'Car name',
      description: 'Car Description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Car Brand',
      category_id: category.id
    })

    expect(car.available).toBe(true)
  })
})
