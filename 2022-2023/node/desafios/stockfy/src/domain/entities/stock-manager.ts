import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface StockManagerProps {
  name: string
  email: string
}

export class StockManager extends Entity<StockManagerProps> {
  static create(props: StockManagerProps, id?: UniqueEntityId) {
    const stockmanager = new StockManager(props, id)

    return stockmanager
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }
}
