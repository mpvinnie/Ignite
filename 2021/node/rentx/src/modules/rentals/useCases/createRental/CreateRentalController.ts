import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateRentalUseCase from './CreateRentalUseCase'

export default class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const { car_id, expected_return_date } = request.body

    const createRental = container.resolve(CreateRentalUseCase)

    const rental = await createRental.execute({
      user_id,
      car_id,
      expected_return_date
    })

    return response.status(201).json(rental)
  }
}
