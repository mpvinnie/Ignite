import { Request, Response } from 'express'
import { container } from 'tsyringe'

import RefreshTokenUseCase from './RefreshTokenUseCase'

export default class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token

    const refreshToken = container.resolve(RefreshTokenUseCase)

    const refresh_token = await refreshToken.execute({
      token
    })

    return response.status(201).json(refresh_token)
  }
}
