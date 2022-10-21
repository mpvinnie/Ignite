import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllPostsUseCase } from "./ListAllPostsUseCase";

export class ListAllPostsController {
  async handle(request: Request, response: Response) {
    const listAllPosts = container.resolve(ListAllPostsUseCase)

    const data = await listAllPosts.execute()

    return response.status(data.code).json(data.posts)
  }
}