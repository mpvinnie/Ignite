import { Optional } from '@/core/types/optional'
import { User, UserProps } from './user'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface DeliveryDriverProps extends UserProps {}

export class DeliveryDriver extends User<DeliveryDriverProps> {
  static create(
    props: Optional<DeliveryDriverProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const deliveryDriver = new DeliveryDriver(
      {
        ...props,
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    return deliveryDriver
  }
}
