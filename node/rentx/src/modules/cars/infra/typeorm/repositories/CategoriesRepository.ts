import ICreateCategoryDTO from '@modules/cars/dtos/ICreateCategoryDTO'
import ICategoriesRepository from '@modules/cars/repositories/ICategoriesRepository'
import { getRepository, Repository } from 'typeorm'

import Category from '../entities/Category'

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  async findById(id: string): Promise<Category> {
    return await this.repository.findOne(id)
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      name,
      description
    })

    await this.repository.save(category)

    return category
  }

  async find(): Promise<Category[]> {
    return await this.repository.find()
  }

  async findByName(name: string): Promise<Category> {
    return await this.repository.findOne({ name })
  }
}

export default CategoriesRepository
