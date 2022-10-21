import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowUserByIdUseCase } from "./ShowUserByIdUseCase";

export class ShowUserByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.body

    const showUserById = container.resolve(ShowUserByIdUseCase)

    const data = await showUserById.execute(id)

    return response.status(data.code).json(data.user || { message: data.message })
  }
}