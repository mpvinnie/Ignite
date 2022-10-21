import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";

@injectable()
export class ShowUserByIdUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: number) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      return {
        code: 404,
        message: 'User not found'
      }
    }

    return {
      code: 200,
      user
    }
  }
}