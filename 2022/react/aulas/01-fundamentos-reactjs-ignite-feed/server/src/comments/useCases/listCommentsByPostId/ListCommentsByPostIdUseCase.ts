import { inject, injectable } from "tsyringe";
import { IPostsRepository } from "../../../posts/repositories/interfaces/IPostsRepository";
import { ICommentsRepository } from "../../repositories/interfaces/ICommentsRepository";

@injectable()
export class ListCommentsByPostIdUseCase {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository
  ) {}

  async execute(post_id: number) {
    const post = await this.postsRepository.findById(post_id)

    if (!post) {
      return {
        code: 404,
        message: 'Post not found'
      }
    }

    const comments = await this.commentsRepository.findByPostId(post_id)

    return {
      code: 200,
      comments
    }
  }
}