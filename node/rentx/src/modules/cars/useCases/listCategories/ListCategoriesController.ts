import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListCategoriesUseCase from './ListCategoriesUseCase'

export default class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListCategoriesUseCase)

    const categories = await listCategories.execute()

    return response.json(categories)
  }
}
