import CategoriesRepositoryInMemory from '@modules/cars/repositories/in-memory/CagetoriesRepositoryInMemory'

import AppError from '@shared/errors/AppError'

import CreateCategoryUseCase from './CreateCategoryUseCase'

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory
let createCategory: CreateCategoryUseCase

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory)
  })

  it('should be able to create a category', async () => {
    const category = await createCategory.execute({
      name: 'Category Name',
      description: 'Description Name'
    })

    expect(category).toHaveProperty('id')
  })

  it('should not be able to create a category a category with same name', async () => {
    await createCategory.execute({
      name: 'Category Name',
      description: 'Description Name'
    })

    await expect(
      createCategory.execute({
        name: 'Category Name',
        description: 'Description Name'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
