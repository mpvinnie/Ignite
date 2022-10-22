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

  async findByPostId(post_id: number): Promise<Comment[]> {
    const comments = await prisma.comment.findMany({
      where: {
        post_id
      },
      include: {
        user: {
          select: {
            avatar_url: true,
            name: true
          }
        }
      }
    })

    return comments
  }
}