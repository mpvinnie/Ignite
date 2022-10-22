import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCommentUseCase } from "./CreateCommentUseCase";

export class CreateCommentController {
  async handle(request: Request, response: Response) {
    const { content, post_id } = request.body
    const { id } = request.headers

    const createComment = container.resolve(CreateCommentUseCase)

    const data = await createComment.execute({
      content,
      post_id,
      user_id: Number(id)
    })

    return response.status(data.code).json(data.comment || { message: data.message })
  }
}