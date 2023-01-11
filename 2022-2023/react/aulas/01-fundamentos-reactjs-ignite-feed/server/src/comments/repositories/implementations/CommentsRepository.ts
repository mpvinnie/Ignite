import { Comment } from "@prisma/client";
import { prisma } from "../../../database";
import { CreateCommentDTO } from "../../dtos/comment";
import { CommentAddedProps, ICommentsRepository } from "../interfaces/ICommentsRepository";

export class CommentsRepository implements ICommentsRepository {
  async create({ content, user_id, post_id }: CreateCommentDTO): Promise<(Comment & CommentAddedProps)> {
    const comment = await prisma.comment.create({
      data: {
        content,
        user_id,
        post_id
      },
      include: {
        user: {
          select: {
            avatar_url: true,
            name: true
          }
        },
        _count: {
          select: {
            comment_applause: true
          }
        },
        comment_applause: {
          where: {
            user_id
          }
        }
      }
    })

    return comment
  }

  async findByPostId(user_id: number, post_id: number): Promise<(Comment & CommentAddedProps)[]> {
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
        },
        _count: {
          select: {
            comment_applause: true
          }
        },
        comment_applause: {
          where: {
            user_id
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return comments
  }

  async findByUserAndCommentId(user_id: number, comment_id: number): Promise<Comment | null> {
    const comment = await prisma.comment.findFirst({
      where: {
        id: comment_id,
        user_id
      }
    })

    return comment
  }

  async delete(comment: Comment): Promise<void> {
    await prisma.comment.delete({
      where: {
        id: comment.id
      }
    })
  }
}