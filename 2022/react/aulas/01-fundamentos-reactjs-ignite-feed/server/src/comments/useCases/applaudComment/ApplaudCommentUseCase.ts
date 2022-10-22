import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../users/repositories/interfaces/IUsersRepository";
import { ApplaudCommentDTO } from "../../dtos/comment";
import { ICommentsApplauseRepository } from "../../repositories/interfaces/ICommentsApplauseRepository";

@injectable()
export class ApplaudCommentUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CommentsApplauseRepository')
    private commentsApplauseRepository: ICommentsApplauseRepository
  ) {}

  async execute({ user_id, comment_id }: ApplaudCommentDTO) {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      return {
        code: 404,
        message: 'User not found'
      }
    }

    const userHasApplaudedComment = await this.commentsApplauseRepository.findByUserAndCommentId(user_id, comment_id)

    if (userHasApplaudedComment) {
      await this.commentsApplauseRepository.delete(userHasApplaudedComment)

      return {
        code: 200,
        commentApplauded: false
      }
    }

    await this.commentsApplauseRepository.create({
      user_id,
      comment_id
    })

    return {
      code: 200,
      commentApplauded: true
    }
  }
}