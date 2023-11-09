import { DeliveryDriver } from '../../enterprise/entities/delivery-driver'

export interface DeliveryDriversRepository {
  findById(id: string): Promise<DeliveryDriver | null>
  findByCpf(cpf: string): Promise<DeliveryDriver | null>
  create(deliveryDriver: DeliveryDriver): Promise<void>
  save(deliveryDriver: DeliveryDriver): Promise<void>
}
