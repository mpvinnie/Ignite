import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowUserByIdUseCase } from "./ShowUserByIdUseCase";

export class ShowUserByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.headers

    const showUserById = container.resolve(ShowUserByIdUseCase)

    const data = await showUserById.execute(Number(id))

    return response.status(data.code).json(data.user || { message: data.message })
  }
}