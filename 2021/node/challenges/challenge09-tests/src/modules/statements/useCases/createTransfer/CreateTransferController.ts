import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateTransferUseCase from './CreateTransferUseCase'

export default class CreateTransferController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id: sender_id } = request.user
    const { amount, description } = request.body

    const splittedPath = request.originalUrl.split('/')
    const recipient_id = splittedPath[5]

    console.log('recipient: ', recipient_id)

    const createTransfer = container.resolve(CreateTransferUseCase)

    const transfer = await createTransfer.execute({
      sender_id,
      recipient_id,
      amount,
      description
    })

    return response.status(201).json(transfer)
  }
}
