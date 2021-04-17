import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('transfers')
class Transfer {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column('uuid')
  sender_id: string

  @Column('uuid')
  recipient_id: string

  @Column('numeric')
  amount: number

  @Column()
  description: string

  @Column()
  type?: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    this.id = uuid()
    this.type = 'tranfer'
  }
}

export default Transfer
