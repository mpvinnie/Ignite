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

}