import { CommentApplause } from "@prisma/client";
import { prisma } from "../../../database";
import { ApplaudCommentDTO } from "../../dtos/comment";
import { ICommentsApplauseRepository } from "../interfaces/ICommentsApplauseRepository";

export class CommentsApplauseRepository implements ICommentsApplauseRepository {
  async create({ user_id, comment_id }: ApplaudCommentDTO): Promise<CommentApplause> {
    const commentApplause = await prisma.commentApplause.create({
      data: {
        user_id,
        comment_id
      }
    })

    return commentApplause
  }

  async findByUserAndCommentId(user_id: number, comment_id: number): Promise<CommentApplause | null> {
    const commentApplause = await prisma.commentApplause.findFirst({
      where: {
        user_id,
        comment_id
      }
    })

    return commentApplause
  }

  async delete(commentAplause: CommentApplause): Promise<void> {
    await prisma.commentApplause.delete({
      where: {
        id: commentAplause.id
      }
    })
  }
}