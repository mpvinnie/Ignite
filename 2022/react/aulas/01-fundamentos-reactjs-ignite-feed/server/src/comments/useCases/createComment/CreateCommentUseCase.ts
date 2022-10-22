import { inject, injectable } from "tsyringe";
import { IPostsRepository } from "../../../posts/repositories/interfaces/IPostsRepository";
import { IUsersRepository } from "../../../users/repositories/interfaces/IUsersRepository";
import { CreateCommentDTO } from "../../dtos/comment";
import { ICommentsRepository } from "../../repositories/interfaces/ICommentsRepository";

@injectable()
export class CreateCommentUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository
  ) {}

  async execute({ content, user_id, post_id }: CreateCommentDTO) {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      return {
        code: 404,
        message: 'User not found'
      }
    }

    const post = await this.postsRepository.findById(post_id)

    if (!post) {
      return {
        code: 404,
        message: 'Post not found'
      }
    }

    const comment = await this.commentsRepository.create({
      content,
      user_id,
      post_id
    })

    return {
      code: 201,
      comment
    }
  }
}