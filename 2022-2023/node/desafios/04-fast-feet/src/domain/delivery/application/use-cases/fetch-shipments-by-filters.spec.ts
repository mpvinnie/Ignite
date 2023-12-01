import { makeShipment } from '../../../../../test/factories/make-shipment'
import { InMemoryAttachmentsRepository } from '../../../../../test/repositories/in-memory-attachments.repository'
import { InMemoryShipmentsRepository } from '../../../../../test/repositories/in-memory-shipments.repository'
import { FetchShipmentsByFiltersUseCase } from './fetch-shipments-by-filters'

let attachmentsRepository: InMemoryAttachmentsRepository
let shipmentsRepository: InMemoryShipmentsRepository
let sut: FetchShipmentsByFiltersUseCase

describe('Fetch shipments by filters', () => {
  beforeEach(() => {
    attachmentsRepository = new InMemoryAttachmentsRepository()
    shipmentsRepository = new InMemoryShipmentsRepository(attachmentsRepository)
    sut = new FetchShipmentsByFiltersUseCase(shipmentsRepository)
  })

  it('shoud be able to fetch shipments by date range', async () => {
    const shipment01 = makeShipment({
      createdAt: new Date(2023, 10, 20)
    })
    const shipment02 = makeShipment({
      createdAt: new Date(2023, 10, 21)
    })
    const shipment03 = makeShipment({
      createdAt: new Date(2023, 10, 22)
    })
    const shipment04 = makeShipment({
      createdAt: new Date(2023, 10, 23)
    })

    shipmentsRepository.create(shipment01)
    shipmentsRepository.create(shipment02)
    shipmentsRepository.create(shipment03)
    shipmentsRepository.create(shipment04)

    const result = await sut.execute({
      page: 1,
      rangeInitialDate: new Date(2023, 10, 21),
      rangeFinalDate: new Date(2023, 10, 22)
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.shipments).toHaveLength(2)
    expect(result.value?.shipments).toEqual([shipment03, shipment02])
  })

  it('shoud be able to fetch shipments by status', async () => {
    const shipment01 = makeShipment({
      createdAt: new Date(2023, 10, 20)
    })
    const shipment02 = makeShipment({
      createdAt: new Date(2023, 10, 21)
    })
    const shipment03 = makeShipment({
      createdAt: new Date(2023, 10, 22),
      status: 'DELIVERED'
    })
    const shipment04 = makeShipment({
      createdAt: new Date(2023, 10, 23)
    })

    shipmentsRepository.create(shipment01)
    shipmentsRepository.create(shipment02)
    shipmentsRepository.create(shipment03)
    shipmentsRepository.create(shipment04)

    const result = await sut.execute({
      page: 1,
      rangeInitialDate: new Date(2023, 10, 21),
      rangeFinalDate: new Date(2023, 10, 22),
      status: 'PREPARING'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.shipments).toHaveLength(1)
    expect(result.value?.shipments).toEqual([shipment02])
  })

  it('shoud be able to fetch paginated shipments', async () => {
    for (let i = 1; i <= 22; i++) {
      shipmentsRepository.create(
        makeShipment({
          createdAt: new Date(2023, 10, i)
        })
      )
    }

    const result = await sut.execute({
      page: 2,
      rangeInitialDate: new Date(2023, 10, 1),
      rangeFinalDate: new Date(2023, 10, 22)
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.shipments).toHaveLength(2)
  })
})
