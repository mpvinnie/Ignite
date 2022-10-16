import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateUserAvatarUseCase from './UpdateUserAvatarUseCase'

export default class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const avatar_file = request.file.filename

    const updateUserAvatar = container.resolve(UpdateUserAvatarUseCase)

    const user = await updateUserAvatar.execute({
      user_id,
      avatar_file
    })

    return response.json(user)
  }
}
