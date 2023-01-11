import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCommentUseCase } from "./DeleteCommentUseCase";

export class DeleteCommentController {
  async handle(request: Request, response: Response) {
    const { id } = request.headers
    const { comment_id } = request.params

    const deleteComment = container.resolve(DeleteCommentUseCase)

    const { code, message } = await deleteComment.execute({
      user_id: Number(id),
      comment_id: Number(comment_id)
    })

    return response.status(code).json({ message })
  }
}