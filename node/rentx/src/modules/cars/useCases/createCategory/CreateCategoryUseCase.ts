import { inject, injectable } from 'tsyringe'

import Category from '../../infra/typeorm/entities/Category'
import ICategoriesRepository from '../../repositories/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.create({
      name,
      description
    })

    return category
  }
}

export default CreateCategoryUseCase
