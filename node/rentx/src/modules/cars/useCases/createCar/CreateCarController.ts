import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CraeteCarUseCase from './CreateCarUseCase'

export default class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    } = request.body

    const createCar = container.resolve(CraeteCarUseCase)

    const car = await createCar.execute({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })

    return response.status(201).json(car)
  }
}
