import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCommentsByPostIdUseCase } from "./ListCommentsByPostIdUseCase";

interface IQuery {
  post_id: number
}

export class ListCommentsByPostIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.headers
    const { post_id } = request.query as unknown as IQuery

    const listComments = container.resolve(ListCommentsByPostIdUseCase)

    const data = await listComments.execute({
      user_id: Number(id),
      post_id: Number(post_id)
    })

    return response.status(data.code).json(data.comments || { message: data.message })
  }
}