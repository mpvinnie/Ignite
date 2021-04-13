import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

import Category from './Category'
import Specification from './Specification'

@Entity('cars')
class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  daily_rate: number

  @Column()
  available: boolean

  @Column()
  license_plate: string

  @Column()
  fine_amount: number

  @Column()
  brand: string

  @Column()
  category_id: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'cars_specifications',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }]
  })
  specifications: Specification[]

  @CreateDateColumn()
  created_at: Date
}

export default Car
