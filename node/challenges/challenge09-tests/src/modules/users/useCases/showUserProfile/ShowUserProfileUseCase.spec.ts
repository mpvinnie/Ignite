import { AppError } from "../../../../shared/errors/AppError"
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository
let showUserProfile: ShowUserProfileUseCase

describe('Show User Profile', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    showUserProfile = new ShowUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to show the user profile', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const userProfile = await showUserProfile.execute(user.id as string)

    expect(userProfile).toEqual(user)
  })

  it('should not be able to show a non-existent user profile', async () => {
    await expect(showUserProfile.execute('non-existent-user-id')).rejects.toBeInstanceOf(AppError)
  })
})
