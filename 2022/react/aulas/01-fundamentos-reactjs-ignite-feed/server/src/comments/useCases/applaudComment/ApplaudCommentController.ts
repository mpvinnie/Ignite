import { Request, Response } from "express";
import { container } from "tsyringe";
import { ApplaudCommentUseCase } from "./ApplaudCommentUseCase";

export class ApplaudCommentController {
  async handle(request: Request, response: Response) {
    const { id } = request.headers
    const { comment_id } = request.params

    const applaudComment = container.resolve(ApplaudCommentUseCase)

    const data = await applaudComment.execute({
      user_id: Number(id),
      comment_id: Number(comment_id)
    })

    return response.status(data.code).json({ commentApplauded: data.commentApplauded } || { message: data.message })
  }
}