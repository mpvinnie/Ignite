import { inject, injectable } from "tsyringe";
import { IPostsRepository } from "../../../posts/repositories/interfaces/IPostsRepository";
import { ListCommentsByPostIdDTO } from "../../dtos/comment";
import { ICommentsRepository } from "../../repositories/interfaces/ICommentsRepository";

@injectable()
export class ListCommentsByPostIdUseCase {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository
  ) {}

  async execute({ user_id, post_id }: ListCommentsByPostIdDTO) {
    const post = await this.postsRepository.findById(post_id)

    if (!post) {
      return {
        code: 404,
        message: 'Post not found'
      }
    }

    const comments = await this.commentsRepository.findByPostId(user_id, post_id)

    const serializedComment = comments.map(comment => {
      if (comment.comment_applause.length > 0) {
        console.log(comment.user_id)
        return {
          ...comment,
          userHasApplauded: true
        }
      } else {
        return {
          ...comment,
          userHasApplauded: false
        }
      }
    })

    return {
      code: 200,
      comments: serializedComment
    }
  }
}