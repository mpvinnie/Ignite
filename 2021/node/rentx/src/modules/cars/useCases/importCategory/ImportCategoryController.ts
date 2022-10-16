import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ImportCategoryUseCase from './ImportCategoryUseCase'

export default class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request

    const importCategory = container.resolve(ImportCategoryUseCase)

    await importCategory.execute({
      file
    })

    return response.status(201).send()
  }
}
