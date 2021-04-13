import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

import Car from './Car'

@Entity('car_images')
class CarImage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  car_id: string

  @Column()
  image_name: string

  @ManyToOne(() => Car, car => car.images)
  @JoinColumn({ name: 'car_id' })
  car: Car

  @CreateDateColumn()
  created_at: Date
}

export default CarImage
