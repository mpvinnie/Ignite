import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
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

  if (!authHeader) {
    throw new AppError('Token missing')
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      'f9668ad95e9b25283eb99326cb61bcb5'
    ) as IPayload

    const usersRepository = new UsersRepository()
    const user = usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User does not exists')
    }

    next()
  } catch {
    throw new AppError('Invalid token!')
  }
}
