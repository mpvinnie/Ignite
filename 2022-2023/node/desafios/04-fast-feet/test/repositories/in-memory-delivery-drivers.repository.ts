import { DeliveryDriversRepository } from '@/domain/delivery/application/repositories/delivery-drivers.repository'
import { DeliveryDriver } from '@/domain/delivery/enterprise/entities/delivery-driver'

export class InMemoryDeliveryDriversRepository
  implements DeliveryDriversRepository
{
  public items: DeliveryDriver[] = []

  async findByCpf(cpf: string) {
    const deliveryDriver = this.items.find(item => item.cpf.toValue() === cpf)

    if (!deliveryDriver) {
      return null
    }

    return deliveryDriver
  }

  async create(deliveryDriver: DeliveryDriver) {
    this.items.push(deliveryDriver)
  }
}
