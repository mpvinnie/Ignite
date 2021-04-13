import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListAvailableCarsUseCase from './ListAvailableCarsUseCase'

export default class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id, name, brand } = request.query

    const listAvailableCars = container.resolve(ListAvailableCarsUseCase)

    const cars = await listAvailableCars.execute({
      category_id: category_id as string,
      name: name as string,
      brand: brand as string
    })

    return response.json(cars)
  }
}
