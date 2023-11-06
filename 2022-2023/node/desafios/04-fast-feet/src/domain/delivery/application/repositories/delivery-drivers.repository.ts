import { DeliveryDriver } from '../../enterprise/entities/delivery-driver'

export interface DeliveryDriversRepository {
  findByCpf(cpf: string): Promise<DeliveryDriver | null>
  create(deliveryDriver: DeliveryDriver): Promise<void>
}
