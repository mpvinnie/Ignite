import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../users/repositories/interfaces/IUsersRepository";
import { DeleteCommentDTO } from "../../dtos/comment";
import { ICommentsRepository } from "../../repositories/interfaces/ICommentsRepository";

@injectable()
export class DeleteCommentUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository
  ) {}

  async execute({ user_id, comment_id }: DeleteCommentDTO) {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      return {
        code: 404,
        message: 'User not found'
      }
    }

    const comment = await this.commentsRepository.findByUserAndCommentId(user_id, comment_id)

    if (!comment) {
      return {
        code: 404,
        message: 'Comment not found'
      }
    }

    await this.commentsRepository.delete(comment)

    return {
      code: 200,
      message: 'Comment successfully deleted'
    }
  }
}