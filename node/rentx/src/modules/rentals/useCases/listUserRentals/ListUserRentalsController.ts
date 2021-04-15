import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListUserRentalsUseCase from './ListUserRentalsUseCase'

class ListUserRentalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const listUserRentals = container.resolve(ListUserRentalsUseCase)

    const rentals = await listUserRentals.execute({
      user_id
    })

    return response.json(rentals)
  }
}

export default ListUserRentalsController
