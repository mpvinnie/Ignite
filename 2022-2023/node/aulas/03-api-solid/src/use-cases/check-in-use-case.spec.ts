import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in-use-case'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check In', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'gym-02',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in same day', async () => {
    vi.setSystemTime(new Date(2023, 6, 18, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'gym-02',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'gym-02',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in same day', async () => {
    vi.setSystemTime(new Date(2023, 6, 18, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'gym-02',
    })

    vi.setSystemTime(new Date(2023, 6, 19, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'gym-02',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
