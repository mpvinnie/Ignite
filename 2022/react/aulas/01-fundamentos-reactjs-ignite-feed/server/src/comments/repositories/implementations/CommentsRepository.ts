import { Comment } from "@prisma/client";
import { prisma } from "../../../database";
import { CreateCommentDTO } from "../../dtos/comment";
import { ICommentsRepository } from "../interfaces/ICommentsRepository";

export class CommentsRepository implements ICommentsRepository {
  async create({ content, user_id, post_id }: CreateCommentDTO): Promise<Comment> {
    const comment = await prisma.comment.create({
      data: {
        content,
        user_id,
        post_id
      }
    })

    return comment
  }

}