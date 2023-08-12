import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let questionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch recent questions', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()

    sut = new FetchRecentQuestionsUseCase(questionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 7, 17) })
    )
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 7, 15) })
    )
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 7, 20) })
    )

    const result = await sut.execute({
      page: 1
    })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2023, 7, 20) }),
      expect.objectContaining({ createdAt: new Date(2023, 7, 17) }),
      expect.objectContaining({ createdAt: new Date(2023, 7, 15) })
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await questionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
