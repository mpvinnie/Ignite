import { Post } from "@prisma/client";
import { prisma } from "../../../database";
import { CreatePostDTO } from "../../dtos/post";
import { IPostsRepository } from "../interfaces/IPostsRepository";

export class PostsRepository implements IPostsRepository {
  async create({ user_id, content }: CreatePostDTO): Promise<Post> {
    const post = await prisma.post.create({
      data: {
        user_id,
        content
      }
    })

    return post
  }

  async findAll(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            avatar_url: true,
            name: true,
            role: true
          }
        },
        comments: {
          include: {
            _count: {
              select: {
                comment_applause: true
              }
            }
          }
        }
      }
    })

    return posts
  }

  async findById(id: number): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: {
        id
      }
    })

    return post
  }
}