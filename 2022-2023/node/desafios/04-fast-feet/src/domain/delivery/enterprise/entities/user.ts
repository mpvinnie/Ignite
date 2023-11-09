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

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
    this.touch()
  }

  get createdAt() {
    return this.props.password
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
