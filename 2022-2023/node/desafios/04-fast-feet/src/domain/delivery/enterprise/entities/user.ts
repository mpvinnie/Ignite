import { Entity } from '@/core/entities/entity'
import { Cpf } from './value-objects/cpf'

export interface UserProps {
  name: string
  cpf: Cpf
  password: string
  createdAt: Date
  updatedAt?: Date | null
}

export abstract class User<Props extends UserProps> extends Entity<Props> {
  private touch() {
    this.props.updatedAt = new Date()
  }

  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.password
  }
}
