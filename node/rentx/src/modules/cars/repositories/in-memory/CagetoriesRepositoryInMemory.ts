import ICreateCategoryDTO from '@modules/cars/dtos/ICreateCategoryDTO'
import Category from '@modules/cars/infra/typeorm/entities/Category'
import { v4 as uuid } from 'uuid'

import ICategoriesRepository from '../ICategoriesRepository'

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = []

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category()

    Object.assign(category, {
      id: uuid(),
      name,
      description
    })

    this.categories.push(category)

    return category
  }

  async find(): Promise<Category[]> {
    return this.categories
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find(category => category.name === name)
  }
}

export default CategoriesRepositoryInMemory
