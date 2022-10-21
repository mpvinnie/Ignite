import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePostUseCase } from "./CreatePostUseCase";

export class CreatePostController {
  async handle(request: Request, response: Response) {
    const { id } = request.headers
    const { content } = request.body

    const createPost = container.resolve(CreatePostUseCase)

    const data = await createPost.execute({
      user_id: Number(id),
      content
    })

    return response.status(data.code).json(data.post || { message: data.message })
  }
}