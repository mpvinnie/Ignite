import { inject, injectable } from "tsyringe";
import { IPostsRepository } from "../../repositories/interfaces/IPostsRepository";

@injectable()
export class ListAllPostsUseCase {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) {}

  async execute() {
    const posts = await this.postsRepository.findAll()

    return {
      code: 200,
      posts
    }
  }
}