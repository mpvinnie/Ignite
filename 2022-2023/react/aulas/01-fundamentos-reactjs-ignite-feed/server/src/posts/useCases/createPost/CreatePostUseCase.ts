import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../users/repositories/interfaces/IUsersRepository";
import { CreatePostDTO } from "../../dtos/post";
import { IPostsRepository } from "../../repositories/interfaces/IPostsRepository";

@injectable()
export class CreatePostUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) {}

  async execute({ user_id, content }: CreatePostDTO) {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      return {
        code: 404,
        message: 'User not found'
      }
    }

    const post = await this.postsRepository.create({
      user_id,
      content
    })

    return {
      code: 201,
      post
    }
  }
}