import { Request, Response } from 'express'
import { container } from 'tsyringe'

import DevolutionRentalUseCase from './DevolutionRentalUseCase'

export default class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const devolutionRental = container.resolve(DevolutionRentalUseCase)

    const rental = await devolutionRental.execute({
      id
    })

    return response.json(rental)
  }
}
