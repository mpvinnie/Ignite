import { CommentApplause } from '@prisma/client';
import { ApplaudCommentDTO } from "../../dtos/comment";

export interface ICommentsApplauseRepository {
  create(data: ApplaudCommentDTO): Promise<CommentApplause>
  findByUserAndCommentId(user_id: number, comment_id: number): Promise<CommentApplause | null>
  delete(commentAplause: CommentApplause): Promise<void>
}