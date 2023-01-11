import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { banner_url, avatar_url, name, role } = request.body

    const createUser = container.resolve(CreateUserUseCase)

    const data = await createUser.execute({
      avatar_url,
      banner_url,
      name,
      role
    })

    return response.status(data.code).json(data.user)
  }
}