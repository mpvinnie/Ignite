import auth from '@config/auth'
import UsersTokensRepository from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import AppError from '@shared/errors/AppError'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization

  const usersTokensRepository = new UsersTokensRepository()

  if (!authHeader) {
    throw new AppError('Token missing')
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload

    const userToken = await usersTokensRepository.findUserToken({
      user_id,
      token
    })

    console.log(userToken)

    if (!userToken) {
      throw new AppError('User token does not exists')
    }

    request.user = {
      id: user_id
    }

    return next()
  } catch {
    throw new AppError('Invalid token!')
  }
}
