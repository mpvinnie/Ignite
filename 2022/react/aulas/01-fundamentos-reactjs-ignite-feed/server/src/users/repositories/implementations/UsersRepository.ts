import { User } from ".prisma/client";
import { prisma } from "../../../database";
import { CreateUserDTO } from "../../dtos/user";
import { IUsersRepository } from "../interfaces/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async create({ avatar_url, banner_url, name, role }: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        avatar_url,
        banner_url,
        name,
        role
      }
    })

    return user
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }
}